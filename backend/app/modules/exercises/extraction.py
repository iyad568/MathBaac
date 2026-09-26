import io
from pathlib import PurePath

from docx import Document
from pypdf import PdfReader

SUPPORTED_EXTENSIONS = {".pdf", ".docx", ".txt", ".md"}


class UnsupportedFileType(ValueError):
    pass


def extract_text(filename: str, content: bytes) -> tuple[str, int | None]:
    """Extract plain text from an uploaded file. Returns (text, page_count or None)."""
    extension = PurePath(filename).suffix.lower()

    if extension == ".pdf":
        reader = PdfReader(io.BytesIO(content))
        pages = [(page.extract_text() or "").strip() for page in reader.pages]
        return "\n\n".join(p for p in pages if p), len(reader.pages)

    if extension == ".docx":
        document = Document(io.BytesIO(content))
        paragraphs = [p.text for p in document.paragraphs if p.text.strip()]
        return "\n".join(paragraphs), None

    if extension in {".txt", ".md"}:
        return content.decode("utf-8", errors="replace").strip(), None

    raise UnsupportedFileType(
        f"Unsupported file type '{extension}'. Supported: {', '.join(sorted(SUPPORTED_EXTENSIONS))}"
    )
