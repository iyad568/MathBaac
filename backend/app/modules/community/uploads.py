import uuid
from pathlib import Path

from fastapi import UploadFile

MAX_IMAGE_BYTES = 5 * 1024 * 1024

# Extension is chosen by us from the sniffed signature, never from the client's
# filename — that's what keeps this safe from path traversal and MIME spoofing.
_SIGNATURES: list[tuple[bytes, str, str]] = [
    (b"\xff\xd8\xff", "jpg", "image/jpeg"),
    (b"\x89PNG\r\n\x1a\n", "png", "image/png"),
    (b"GIF87a", "gif", "image/gif"),
    (b"GIF89a", "gif", "image/gif"),
]

UPLOADS_ROOT = Path(__file__).resolve().parent.parent.parent.parent / "uploads"
COMMUNITY_UPLOADS_DIR = UPLOADS_ROOT / "community"


class InvalidImageUpload(Exception):
    def __init__(self, message: str):
        self.message = message


def _detect_image(content: bytes) -> tuple[str, str]:
    if content[:4] == b"RIFF" and content[8:12] == b"WEBP":
        return "webp", "image/webp"
    for signature, ext, content_type in _SIGNATURES:
        if content.startswith(signature):
            return ext, content_type
    raise InvalidImageUpload("الملف ليس صورة صالحة (jpg, png, gif, webp فقط)")


async def save_community_image(file: UploadFile) -> str:
    """Validates and stores an uploaded image, returning its path under /uploads.

    The stored filename is always server-generated; the client's own filename
    and declared content-type are never trusted.
    """
    content = await file.read()
    if not content:
        raise InvalidImageUpload("الملف فارغ")
    if len(content) > MAX_IMAGE_BYTES:
        raise InvalidImageUpload("حجم الصورة يتجاوز الحد الأقصى المسموح به (5 ميغابايت)")

    ext, _content_type = _detect_image(content)

    COMMUNITY_UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
    filename = f"{uuid.uuid4().hex}.{ext}"
    (COMMUNITY_UPLOADS_DIR / filename).write_bytes(content)

    return f"/uploads/community/{filename}"
