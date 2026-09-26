import { CategoryInfo, BadgeInfo, CommunityCategoryKey, CommunityPost, CommunityUser } from '../types/community';

export const COMMUNITY_CATEGORIES: CategoryInfo[] = [
  {
    key: 'mathematics',
    label: 'الرياضيات العامة',
    englishLabel: 'Mathematics',
    description: 'المفاهيم والنظريات الأساسية والجبر والمعادلات',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    borderColor: 'border-indigo-500',
    iconName: 'Sigma'
  },
  {
    key: 'functions',
    label: 'الدوال العددية',
    englishLabel: 'Functions',
    description: 'دراسة الدوال الأسية، اللوغاريتمية، النهايات والاستمرار',
    color: 'blue',
    badgeBg: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
    badgeText: 'text-blue-700 dark:text-blue-300',
    borderColor: 'border-blue-500',
    iconName: 'TrendingUp'
  },
  {
    key: 'derivatives',
    label: 'الاشتقاقية وتطبيقاتها',
    englishLabel: 'Derivatives',
    description: 'العدد المشتق، إشارة المشتق، مبرهنة القيم المتوسطة ونقاط الانعطاف',
    color: 'cyan',
    badgeBg: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/60',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    borderColor: 'border-cyan-500',
    iconName: 'Activity'
  },
  {
    key: 'integrals',
    label: 'التكامل والحساب التكاملي',
    englishLabel: 'Integrals',
    description: 'الدوال الأصلية، المكاملة بالتجزئة، وحساب المساحات والحجوم',
    color: 'violet',
    badgeBg: 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/60',
    badgeText: 'text-violet-700 dark:text-violet-300',
    borderColor: 'border-violet-500',
    iconName: 'Variable'
  },
  {
    key: 'probability',
    label: 'الاحتمالات',
    englishLabel: 'Probability',
    description: 'الاحتمال الشرطي، المتغير العشوائي، وقوانين السحب والتوزيع',
    color: 'emerald',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    borderColor: 'border-emerald-500',
    iconName: 'Dices'
  },
  {
    key: 'geometry',
    label: 'الهندسة في الفضاء',
    englishLabel: 'Geometry',
    description: 'الجداء السلمي، معادلات المستقيمات والمستويات والمسافات',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
    badgeText: 'text-amber-700 dark:text-amber-300',
    borderColor: 'border-amber-500',
    iconName: 'Compass'
  },
  {
    key: 'bac-exercises',
    label: 'تمارين البكالوريا',
    englishLabel: 'BAC Exercises',
    description: 'مناقشة وحلول مواضيع البكالوريا الرسمية السابقة والتجريبية',
    color: 'rose',
    badgeBg: 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60',
    badgeText: 'text-rose-700 dark:text-rose-300',
    borderColor: 'border-rose-500',
    iconName: 'GraduationCap'
  },
  {
    key: 'study-tips',
    label: 'نصائح ومنهجية المذاكرة',
    englishLabel: 'Study Tips',
    description: 'تنظيم الوقت، صياغة الإجابة النموذجية في الامتحان، وتجنب فخاخ التصحيح',
    color: 'teal',
    badgeBg: 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800/60',
    badgeText: 'text-teal-700 dark:text-teal-300',
    borderColor: 'border-teal-500',
    iconName: 'Lightbulb'
  },
  {
    key: 'general',
    label: 'أسئلة عامة واستفسارات',
    englishLabel: 'General Questions',
    description: 'استفسارات حول المعاملات، الشعب، المراجع الخارجية والآلات الحاسبة',
    color: 'slate',
    badgeBg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    badgeText: 'text-slate-700 dark:text-slate-300',
    borderColor: 'border-slate-500',
    iconName: 'HelpCircle'
  }
];

export const COMMUNITY_BADGES: Record<string, BadgeInfo> = {
  'helpful-student': {
    id: 'helpful-student',
    title: 'طالب متعاون',
    englishTitle: 'Helpful Student',
    description: 'قدم 3 إجابات مفيدة نالت إعجاب زملائه الطلبة',
    icon: 'HeartHandshake',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
    textClass: 'text-blue-700 dark:text-blue-300',
    borderClass: 'border-blue-200 dark:border-blue-800/60'
  },
  'math-expert': {
    id: 'math-expert',
    title: 'خبير الرياضيات',
    englishTitle: 'Mathematics Expert',
    description: 'تجاوز رصيد نقاط السمعة 100 نقطة بفضل دقة براهينه الرياضية',
    icon: 'Award',
    bgClass: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60',
    textClass: 'text-indigo-700 dark:text-indigo-300',
    borderClass: 'border-indigo-200 dark:border-indigo-800/60'
  },
  'bac-helper': {
    id: 'bac-helper',
    title: 'سند البكالوريا',
    englishTitle: 'BAC Helper',
    description: 'تم اختيار إجاباته كأفضل إجابة نموذجية في تمارين ومواضيع البكالوريا',
    icon: 'CheckCircle2',
    bgClass: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    textClass: 'text-emerald-700 dark:text-emerald-300',
    borderClass: 'border-emerald-200 dark:border-emerald-800/60'
  },
  'top-contributor': {
    id: 'top-contributor',
    title: 'مساهم متميز',
    englishTitle: 'Top Contributor',
    description: 'من بين أكثر الأعضاء نشاطاً ومساعدة لزملائه في مختلف المحاور',
    icon: 'Flame',
    bgClass: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
    textClass: 'text-amber-700 dark:text-amber-300',
    borderClass: 'border-amber-200 dark:border-amber-800/60'
  }
};

export const SEED_USERS: Record<string, CommunityUser> = {
  'usr_aymen_expert': {
    id: 'usr_aymen_expert',
    name: 'أيمن مزياني',
    username: 'aymen_math_bac',
    stream: 'شعبة رياضيات (Mathématiques)',
    reputation: 245,
    badges: ['math-expert', 'bac-helper', 'top-contributor'],
    postsCount: 14,
    answersCount: 38,
    helpfulAnswersCount: 22,
    joinedDate: 'سبتمبر 2024',
    bio: 'طالب بكالوريا متفوق مهتم بتبسيط النهايات والاشتقاقية ومساعدة زملائي للوصول إلى 20/20 بإذن الله.'
  },
  'usr_sarah_dz': {
    id: 'usr_sarah_dz',
    name: 'سارة بوجمعة',
    username: 'sarah_sciences',
    stream: 'شعبة علوم تجريبية (Sciences)',
    reputation: 160,
    badges: ['helpful-student', 'bac-helper'],
    postsCount: 9,
    answersCount: 21,
    helpfulAnswersCount: 14,
    joinedDate: 'أكتوبر 2024',
    bio: 'طالبة علوم تجريبية أحضر لبكالوريا 2025 بمعدل مستهدف 18+. شغوفة بالدوال والتكاملات.'
  },
  'usr_prof_khalil': {
    id: 'usr_prof_khalil',
    name: 'أ. خليل بن عمارة',
    username: 'prof_khalil_dz',
    stream: 'أستاذ تعليم ثانوي مادة الرياضيات',
    reputation: 490,
    badges: ['math-expert', 'top-contributor', 'bac-helper'],
    postsCount: 26,
    answersCount: 65,
    helpfulAnswersCount: 54,
    joinedDate: 'أوت 2024',
    bio: 'أستاذ رياضيات ثانوية، أشارك منهجيات التصحيح الوزاري الرسمية والإجابات النموذجية.'
  },
  'usr_bilal_tech': {
    id: 'usr_bilal_tech',
    name: 'بلال قندوز',
    username: 'bilal_tech_math',
    stream: 'شعبة تقني رياضي (هندسة ميكانيكية)',
    reputation: 85,
    badges: ['helpful-student'],
    postsCount: 6,
    answersCount: 12,
    helpfulAnswersCount: 7,
    joinedDate: 'نوفمبر 2024',
    bio: 'مهتم بالاحتمالات والمتتاليات والهندسة الفضائية.'
  },
  'usr_yasmine_b': {
    id: 'usr_yasmine_b',
    name: 'ياسمين بلقاسم',
    username: 'yasmine_bac25',
    stream: 'شعبة علوم تجريبية (Sciences)',
    reputation: 45,
    badges: ['helpful-student'],
    postsCount: 8,
    answersCount: 7,
    helpfulAnswersCount: 3,
    joinedDate: 'جانفي 2025',
    bio: 'أركز على حل تمارين الدوال الأسية واللوغاريتمية وتدوين أهم الملاحظات.'
  }
};

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post_1',
    title: 'كيفية إزالة حالة عدم التعيين من الشكل 0/0 في الدالة f(x) = (√(x+1) - 1) / x عند 0؟',
    content: `السلام عليكم زملائي الكرام،
أثناء حلي لتمرين في حساب النهايات لدالة ناطقة تتضمن جذراً تربيعياً:
$$f(x) = \\frac{\\sqrt{x+1} - 1}{x}$$
عند حساب $\\lim_{x \\to 0} f(x)$ نتحصل مباشرة على حالة عدم تعيين من الشكل $\\left[\\frac{0}{0}\\right]$.

قمت بالضرب في المرافق $\\sqrt{x+1} + 1$ ووجدت النتيجة $\\frac{1}{2}$، لكني سمعت الأستاذ يذكر إمكانية حلها باستعمال تعريف العدد المشتق أيضاً. هل يمكن لشخص شرح كلا الطريقتين بدقة وما هي الطريقة الأسرع والمضمونة في البكالوريا؟`,
    category: 'functions',
    author: SEED_USERS['usr_yasmine_b'],
    createdAt: 'منذ ساعتين',
    votes: 18,
    userVote: null,
    isFollowed: true,
    viewsCount: 142,
    answersCount: 2,
    hasBestAnswer: true,
    tags: ['الدوال', 'النهايات', 'المرافق', 'العدد المشتق'],
    answers: [
      {
        id: 'ans_1_1',
        postId: 'post_1',
        author: SEED_USERS['usr_aymen_expert'],
        content: `وعليكم السلام ورحمة الله أختي ياسمين،
طريقتك بالضرب في المرافق صحيحة 100% وهي الطريقة الكلاسيكية المعتمدة:

**1. طريقة الضرب والقسمة على المرافق:**
$$f(x) = \\frac{(\\sqrt{x+1}-1)(\\sqrt{x+1}+1)}{x(\\sqrt{x+1}+1)} = \\frac{(x+1)-1}{x(\\sqrt{x+1}+1)} = \\frac{x}{x(\\sqrt{x+1}+1)}$$
بالاختزال على $x$ (بما أن $x \\neq 0$):
$$f(x) = \\frac{1}{\\sqrt{x+1}+1}$$
وعندئذ:
$$\\lim_{x \\to 0} f(x) = \\frac{1}{\\sqrt{0+1}+1} = \\frac{1}{2}$$

**2. طريقة العدد المشتق (سريعة جداً):**
نعتبر الدالة $g(x) = \\sqrt{x+1}$ القابلة للاشتقاق عند $x_0 = 0$ حيث $g(0) = 1$.
النهاية تصبح على الشكل النموذجي:
$$\\lim_{x \\to 0} \\frac{g(x) - g(0)}{x - 0} = g'(0)$$
مشتقة $g(x)$ هي:
$$g'(x) = \\frac{1}{2\\sqrt{x+1}} \\implies g'(0) = \\frac{1}{2\\sqrt{1}} = \\frac{1}{2}$$

كلا الطريقتين تقبلان في التصحيح النموذجي للبكالوريا وتمنحان العلامة الكاملة!`,
        createdAt: 'منذ ساعة ونصف',
        votes: 24,
        userVote: 'up',
        isBestAnswer: true,
        replies: [
          {
            id: 'rep_1_1_1',
            answerId: 'ans_1_1',
            author: SEED_USERS['usr_yasmine_b'],
            content: 'شكراً جزيلاً أخي أيمن! شرح دقيق ومفهوم جداً خاصة طريقة الدالة المساعدة $g(x)$.',
            createdAt: 'منذ ساعة',
            votes: 5,
            userVote: null
          },
          {
            id: 'rep_1_1_2',
            answerId: 'ans_1_1',
            author: SEED_USERS['usr_prof_khalil'],
            content: 'إجابة ممتازة ووافية من التلميذ أيمن. ملاحظة فقط للتلاميذ: في حالة استعمال العدد المشتق يجب دوماً ذكر جملة "بما أن الدالة g قابلة للاشتقاق عند 0" لتفادي خسارة ربع نقطة التبرير.',
            createdAt: 'منذ 40 دقيقة',
            votes: 16,
            userVote: null
          }
        ]
      },
      {
        id: 'ans_1_2',
        postId: 'post_1',
        author: SEED_USERS['usr_bilal_tech'],
        content: `أنصحك شخصياً بطريقة المرافق لأنها أكثر أماناً وتجنبك نسيان تبرير قابلية الاشتقاق. كما أنها تمهدك لتمارين المتتاليات التي تحتوي جذوراً تربيعية. بالتوفيق!`,
        createdAt: 'منذ 50 دقيقة',
        votes: 4,
        userVote: null,
        isBestAnswer: false,
        replies: []
      }
    ]
  },
  {
    id: 'post_2',
    title: 'تمرين بكالوريا 2023 شعبة علوم تجريبية - مسألة الدالة اللوغاريتمية والوضعية النسبية',
    content: `مرحباً بالجميع،
أثناء مراجعة موضوع بكالوريا 2023 (الموضوع الثاني - المسألة):
المطلوب دراسة الوضع النسبي للمنحنى $(C_f)$ بالنسبة للمستقيم المقارب المائل $(\\Delta)$ ذي المعادلة $y = x - 2$.
الفرق المحسوب هو:
$$f(x) - y = \\frac{2\\ln(x) - 1}{x}$$
على المجال $]0; +\\infty[$.
السؤال: هل يكفي القول أن إشارة الفرق من إشارة البسط لأن المقام $x > 0$، أم يجب تفصيل جدول إشارة كامل مع تعيين نقطة التقاطع ذات الفاصلة $x = e^{1/2} = \\sqrt{e}$؟`,
    category: 'bac-exercises',
    author: SEED_USERS['usr_sarah_dz'],
    createdAt: 'منذ 4 ساعات',
    votes: 31,
    userVote: null,
    isFollowed: false,
    viewsCount: 280,
    answersCount: 1,
    hasBestAnswer: true,
    tags: ['بكالوريا 2023', 'الدالة اللوغاريتمية', 'الوضعية النسبية', 'المقارب المائل'],
    answers: [
      {
        id: 'ans_2_1',
        postId: 'post_2',
        author: SEED_USERS['usr_prof_khalil'],
        content: `أهلاً بك ابنتي سارة،
في شبكة التنقيط الوزارية الرسمية لبكالوريا 2023 تم تقسيم النقطة (0.5 ن) كالتالي:
1. الإشارة إلى أن إشارة الفرق من إشارة البسط لأن $x \\in ]0; +\\infty[$ أي $x > 0$ (0.25 ن).
2. حل المعادلة $2\\ln(x) - 1 = 0 \\iff \\ln(x) = \\frac{1}{2} \\iff x = \\sqrt{e}$، واستنتاج المجالات:
   - لما $x \\in ]0; \\sqrt{e}[$: المنحنى $(C_f)$ يقع تحت المستقيم $(\\Delta)$.
   - لما $x \\in ]\\sqrt{e}; +\\infty[$: المنحنى $(C_f)$ يقع فوق المستقيم $(\\Delta)$.
   - لما $x = \\sqrt{e}$: المنحنى يقطع المستقيم في النقطة $A(\\sqrt{e}, \\sqrt{e}-2)$ (0.25 ن).

جدول الإشارة غير إجباري إذا كُتبت الاستنتاجات واضحة بالصيغة اللغوية الرياضية، ولكن وضع الجدول يُفضل دوماً لأنه أكثر ترتيباً ويبعد اللبس عند المصحح.`,
        createdAt: 'منذ 3 ساعات',
        votes: 29,
        userVote: null,
        isBestAnswer: true,
        replies: [
          {
            id: 'rep_2_1_1',
            answerId: 'ans_2_1',
            author: SEED_USERS['usr_sarah_dz'],
            content: 'بارك الله فيك أستاذنا الفاضل، سأحرص دائماً على رسم جدول الإشارة تفادياً لأي لبس.',
            createdAt: 'منذ ساعتين',
            votes: 4,
            userVote: null
          }
        ]
      }
    ]
  },
  {
    id: 'post_3',
    title: 'الفرق بين السحب في آن واحد والسحب على التوالي بدون إرجاع مع أمثلة الصناديق',
    content: `السلام عليكم،
أرجو المساعدة في محور الاحتمالات:
كثيراً ما يختلط علي الأمر بين:
1. سحب كرتين في آن واحد (Simultané).
2. سحب كرتين على التوالي دون إرجاع (Successif sans remise).
متى يؤثر الترتيب ولماذا نضرب في معامل الترتيب في الحالة الثانية بينما لا نضرب في الأولى؟ هل من مثال عددي بسيط؟`,
    category: 'probability',
    author: SEED_USERS['usr_bilal_tech'],
    createdAt: 'منذ 8 ساعات',
    votes: 22,
    userVote: null,
    isFollowed: true,
    viewsCount: 195,
    answersCount: 1,
    hasBestAnswer: false,
    tags: ['الاحتمالات', 'التوفيقات', 'الترتيبات', 'معامل الترتيب'],
    answers: [
      {
        id: 'ans_3_1',
        postId: 'post_3',
        author: SEED_USERS['usr_aymen_expert'],
        content: `أهلاً بلال، الفرق الجوهري هو **أهمية ترتيب الكرات**:

- **السحب في آن واحد:**
  تضع يدك في الصندوق وتسحب الكرتين معاً. الكرتان تخرجان في نفس اللحظة، إذن لا يوجد "أولى" و"ثانية". هنا نستخدم التوفيقات:
  $$C_n^p = \\frac{n!}{p!(n-p)!}$$
  ولا يوجد أي معامل ترتيب نهائياً لأن الترتيب غير ملحوظ.

- **السحب على التوالي دون إرجاع:**
  تسحب كرة أولى، تضعها جانباً، ثم تسحب كرة ثانية. هنا يوجد ترتيب زمني واضح (الكرة الأولى ثم الكرة الثانية). نستخدم الترتيبات:
  $$A_n^p = \\frac{n!}{(n-p)!}$$

**مثال عددي:**
صندوق به 3 حمراء و 2 بيضاء. نسحب كرتين مختلفتين في اللون (واحدة حمراء وواحدة بيضاء):
- في آن واحد: الاحتمال هو $\\frac{C_3^1 \\times C_2^1}{C_5^2} = \\frac{3 \\times 2}{10} = \\frac{6}{10}$.
- على التوالي دون إرجاع: إما (حمراء ثم بيضاء) أو (بيضاء ثم حمراء).
  الحساب: $\\frac{A_3^1 \\times A_2^1 + A_2^1 \\times A_3^1}{A_5^2} = \\frac{6 + 6}{20} = \\frac{12}{20} = \\frac{6}{10}$.

لاحظ أن النتيجة النهائية للاحتمال هي نفسها دائماً!`,
        createdAt: 'منذ 6 ساعات',
        votes: 19,
        userVote: null,
        isBestAnswer: false,
        replies: []
      }
    ]
  },
  {
    id: 'post_4',
    title: 'مبرهنة القيم المتوسطة وتعيين حصر للعدد α حل المعادلة f(x) = 0 بدقة 10⁻²',
    content: `عند تطبيق مبرهنة القيم المتوسطة (TVI) لإثبات أن المعادلة $f(x) = 0$ تقبل حلاً وحيداً $\\alpha$ في مجال $[a, b]$:
ما هي الشروط الثلاثة الإلزامية التي يجب كتابتها؟
وهل طريقة المسح بالآلة الحاسبة (Table) كافية في البكالوريا أم يجب كتابة حساب صور طرفي الحصر في ورقة الإجابة؟`,
    category: 'derivatives',
    author: SEED_USERS['usr_sarah_dz'],
    createdAt: 'منذ يوم',
    votes: 35,
    userVote: null,
    isFollowed: false,
    viewsCount: 310,
    answersCount: 1,
    hasBestAnswer: true,
    tags: ['مبرهنة القيم المتوسطة', 'حصر ألفا', 'الاشتقاقية', 'منهجية'],
    answers: [
      {
        id: 'ans_4_1',
        postId: 'post_4',
        author: SEED_USERS['usr_prof_khalil'],
        content: `الشروط الثلاثة الأساسية التي تحاسب عليها لجان التصحيح:
1. **الاستمرارية:** الدالة $f$ مستمرة على المجال $[a, b]$.
2. **الرتابة الصارمة:** الدالة $f$ متزايدة تماماً (أو متناقصة تماماً) على $[a, b]$.
3. **الجداء أو الانتماء:** $f(a) \\times f(b) < 0$ (أو الصفر محصور بين $f(a)$ و $f(b)$).

**بالنسبة للحصر بدقة $10^{-2}$:**
يمكنك استخراج القيم بواسطة جدول الآلة الحاسبة (وضع الخطوة step = 0.01)، ولكن في ورقة الإجابة **يجب إلزامياً كتابة قيمة $f(a)$ وقيمة $f(b)$** مع الإشارة إلى أن أحدهما سالب والآخر موجب! عدم كتابة القيمتين يخصم 0.25 نقطة.`,
        createdAt: 'منذ 20 ساعة',
        votes: 42,
        userVote: null,
        isBestAnswer: true,
        replies: []
      }
    ]
  },
  {
    id: 'post_5',
    title: 'أفضل برنامج مراجعة يومي لمادة الرياضيات للوصول إلى علامة 18+ في البكالوريا',
    content: `إلى جميع طلبة بكالوريا 2025:
ما هو المعدل الزمني اليومي لحل مواضيع الرياضيات؟ وهل الأفضل البدء بحل تمارين الأفكار الفردية أم الانتقال فوراً للمواضيع الشاملة المماثلة للبكالوريا؟
أرجو مشاركة تجاربكم ونصائح الأساتذة الكرام.`,
    category: 'study-tips',
    author: SEED_USERS['usr_aymen_expert'],
    createdAt: 'منذ يومين',
    votes: 56,
    userVote: 'up',
    isFollowed: true,
    viewsCount: 520,
    answersCount: 2,
    hasBestAnswer: true,
    tags: ['نصائح', 'برنامج دراسي', 'تفوق', 'بكالوريا 2025'],
    answers: [
      {
        id: 'ans_5_1',
        postId: 'post_5',
        author: SEED_USERS['usr_prof_khalil'],
        content: `نصيحتي الأبوية والأكاديمية لطلابي:
- **في الفصل الأول والثاني:** 70% تمارين أفكار نموذجية لكل محور، 30% مسائل شاملة.
- **في الفصل الثالث والمراجعة النهائية:** 80% مواضيع كاملة مع توقيت منبه لـ 3 ساعات ونصف بدون النظر للحل إطلاقاً حتى تنتهي المحاولة.
- احتفظ بـ "دفتر الأخطاء الذهبي": كل خطأ في إشارة أو نهاية أو قراءة منحنى دونه بلون أحمر وراجعه أسبوعياً.`,
        createdAt: 'منذ يوم ونصف',
        votes: 48,
        userVote: null,
        isBestAnswer: true,
        replies: []
      },
      {
        id: 'ans_5_2',
        postId: 'post_5',
        author: SEED_USERS['usr_sarah_dz'],
        content: `أنا أخصص ساعتين يومياً في الصباح الباكر للرياضيات. التدريب على كتابة البراهين بأسلوب منظم يرفع العلامة بشكل لا يصدق لأن المصحح يرتاح للورقة النظيفة ذات الخط الواضح.`,
        createdAt: 'منذ يوم',
        votes: 15,
        userVote: null,
        isBestAnswer: false,
        replies: []
      }
    ]
  },
  {
    id: 'post_6',
    title: 'المكاملة بالتجزئة: قاعدة اختيار الدالتين u(x) و v\'(x) بواسطة كلمة ALPES',
    content: `السلام عليكم،
هل قاعدة ALPES (Arc, Log, Polynôme, Exp, Sin/Cos) صالحة دائماً في المنهج الجزائري لحساب التكامل بالتجزئة:
$$\\int_a^b u(x) v'(x) dx = [u(x)v(x)]_a^b - \\int_a^b u'(x) v(x) dx$$
مثلاً في حساب $\\int_1^e x \\ln(x) dx$ كيف نطبقها؟`,
    category: 'integrals',
    author: SEED_USERS['usr_bilal_tech'],
    createdAt: 'منذ 3 أيام',
    votes: 27,
    userVote: null,
    isFollowed: false,
    viewsCount: 210,
    answersCount: 1,
    hasBestAnswer: true,
    tags: ['التكامل', 'المكاملة بالتجزئة', 'قاعدة ALPES', 'الدالة اللوغاريتمية'],
    answers: [
      {
        id: 'ans_6_1',
        postId: 'post_6',
        author: SEED_USERS['usr_aymen_expert'],
        content: `نعم، قاعدة ALPES ممتازة وفعالة جداً وتساعدك على اختيار $u(x)$ التي يسهل اشتقاقها:
- **L** (Logarithme): تأتي قبل كثيرات الحدود **P** (Polynôme).
إذن في $\\int_1^e x \\ln(x) dx$:
نضع:
$$u(x) = \\ln(x) \\implies u'(x) = \\frac{1}{x}$$
$$v'(x) = x \\implies v(x) = \\frac{x^2}{2}$$
نطبق القانون مباشرة:
$$\\int_1^e x \\ln(x) dx = \\left[\\frac{x^2}{2}\\ln(x)\\right]_1^e - \\int_1^e \\frac{x^2}{2} \\times \\frac{1}{x} dx$$
$$= \\left(\\frac{e^2}{2} - 0\\right) - \\frac{1}{2}\\int_1^e x dx = \\frac{e^2}{2} - \\frac{1}{2}\\left[\\frac{x^2}{2}\\right]_1^e = \\frac{e^2+1}{4}$$
طريقة سريعة ومضمونة!`,
        createdAt: 'منذ يومين',
        votes: 30,
        userVote: null,
        isBestAnswer: true,
        replies: []
      }
    ]
  },
  {
    id: 'post_7',
    title: 'تعيين معادلة ديكارتية لمستوٍ يشمل ثلاث نقط غير استقامية A و B و C',
    content: `في الهندسة الفضائية، ما هي أسرع طريقة لتعيين شعاع ناظمي $\\vec{n}(a, b, c)$ للمستوي $(ABC)$؟
هل نعتمد الجملة $\\vec{n} \\cdot \\vec{AB} = 0$ و $\\vec{n} \\cdot \\vec{AC} = 0$ بوضع إحدى المركبات تساوي 1، أم توجد طريقة الجداء الشعاعي المباشر؟`,
    category: 'geometry',
    author: SEED_USERS['usr_yasmine_b'],
    createdAt: 'منذ 4 أيام',
    votes: 14,
    userVote: null,
    isFollowed: false,
    viewsCount: 165,
    answersCount: 1,
    hasBestAnswer: false,
    tags: ['الهندسة الفضائية', 'الشعاع الناظمي', 'المستوي', 'الجداء السلمي'],
    answers: [
      {
        id: 'ans_7_1',
        postId: 'post_7',
        author: SEED_USERS['usr_bilal_tech'],
        content: `في شعبة العلوم التجريبية، الجداء الشعاعي غير مدرج رسمياً في المقرر، لذلك الطريقة النظامية الإلزامية هي حل الجملة:
$$\\vec{n} \\cdot \\vec{AB} = 0 \\quad \\text{و} \\quad \\vec{n} \\cdot \\vec{AC} = 0$$
وتفرضي مثلاً $c = 1$ أو $a = 1$ لتحصلي على شعاع ناظمي صحيح.
أما في شعبتي التقني رياضي والرياضيات فالجداء الشعاعي $\\vec{AB} \\wedge \\vec{AC}$ مسموح ومباشر.`,
        createdAt: 'منذ 3 أيام',
        votes: 18,
        userVote: null,
        isBestAnswer: false,
        replies: []
      }
    ]
  },
  {
    id: 'post_8',
    title: 'سؤال غير مجاب: نقطة انعطاف المنحنى عند انعدام المشتقة الثانية دون تغيير إشارتها؟',
    content: `أرجو توضيح هذه النقطة الشائكة:
إذا انعدمت المشتقة الثانية $f''(x_0) = 0$ ولكن لم تُغير إشارتها (بقيت موجبة مثلاً قبل وبعد $x_0$)، هل يمكن اعتبار النقطة $(x_0, f(x_0))$ نقطة انعطاف؟ وماذا لو انعدمت المشتقة الأولى $f'(x_0) = 0$ ولم تغير إشارتها؟
أريد أمثلة بدوال واضحة مثل $x^4$ و $x^3$.`,
    category: 'mathematics',
    author: SEED_USERS['usr_sarah_dz'],
    createdAt: 'منذ 5 ساعات',
    votes: 16,
    userVote: null,
    isFollowed: false,
    viewsCount: 98,
    answersCount: 0,
    hasBestAnswer: false,
    tags: ['نقطة الانعطاف', 'المشتقة الثانية', 'تحدب المنحنى', 'تفسير هندسي'],
    answers: []
  },
  {
    id: 'post_9',
    title: 'هل الآلة الحاسبة العلمية كاسيو fx-991EX مسموحة في امتحان البكالوريا؟',
    content: `السلام عليكم،
أريد التأكد من الحراس والأساتذة هل آلة كاسيو ذات الشاشة العريضة fx-991 (التي تحسب المصفوفات والتكاملات) مسموحة في مراكز الإجراء لشهادة البكالوريا 2025 أم يتم حجزها والطلب استبدالها بآلة غير مبرمجة عادية؟`,
    category: 'general',
    author: SEED_USERS['usr_bilal_tech'],
    createdAt: 'منذ 5 أيام',
    votes: 40,
    userVote: null,
    isFollowed: false,
    viewsCount: 680,
    answersCount: 2,
    hasBestAnswer: true,
    tags: ['الآلة الحاسبة', 'قوانين الامتحان', 'كاسيو', 'البكالوريا'],
    answers: [
      {
        id: 'ans_9_1',
        postId: 'post_9',
        author: SEED_USERS['usr_prof_khalil'],
        content: `القانون الوزاري ينص على: "يُسمح باستعمال الآلة الحاسبة العلمية غير المبرمجة (Non programmable)".
آلة كاسيو fx-991EX ClassWiz ليست مبرمجة (لا يمكن تخزين نصوص أو برامج عليها)، وبالتالي هي مسموحة رسمياً في كل المراكز.
لكن تجنباً لأي سوء فهم مع حراس لا يفرقون بين المبرمجة وغير المبرمجة، يُنصح دائماً بإحضار آلة حاسبة احتياطية بسيطة (مثل fx-82) تحسب العمليات والدوال المثلثية.`,
        createdAt: 'منذ 4 أيام',
        votes: 38,
        userVote: null,
        isBestAnswer: true,
        replies: []
      },
      {
        id: 'ans_9_2',
        postId: 'post_9',
        author: SEED_USERS['usr_aymen_expert'],
        content: `أنا استعملتها العام الماضي في امتحان البكالوريا التجريبي ولم يكن هناك أي اعتراض لأنها خالية من ميزة البرمجة النصية.`,
        createdAt: 'منذ 4 أيام',
        votes: 11,
        userVote: null,
        isBestAnswer: false,
        replies: []
      }
    ]
  }
];
