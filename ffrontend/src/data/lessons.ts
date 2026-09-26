import { Lesson } from '../types';

export const lessons: Record<string, Lesson> = {
  // 1. التقويم التشخيصي
  'diagnostic-assessment': {
    id: 'lesson-diagnostic-assessment',
    conceptId: 'diagnostic-assessment',
    title: 'تقويم تشخيصي وتثبيت مكتسبات السنة الثانية ثانوي',
    videoUrl: 'https://www.youtube.com/watch?v=kYJzXv_j2lQ',
    videoTitle: 'مراجعة المكتسبات القبلية الضرورية لبكالوريا الرياضيات (الاشتقاق، كثيرات الحدود، والمماسات)',
    videoDuration: '18:45',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 90,
    objectives: [
      'تثبيت قواعد حساب المشتقات الأساسية للدوال المألوفة (كثيرات الحدود، مقلوب، وجذر تربيعي).',
      'تذكر حساب العدد المشتق f\'(x₀) وتفسيره البياني كمعامل توجيه للمماس.',
      'كتابة معادلة مماس المنحنى عند نقطة معلومة أو بمعامل توجيه معطى.',
      'التحكم في إشارة ثلاثي الحدود ax² + bx + c وحل المعادلات باستخدام المميز Δ.'
    ],
    theory: {
      title: 'القواعد الأساسية من السنة الثانية ثانوي',
      summary: 'العدد المشتق f\'(x₀) هو نهاية نسبة التزايد عندما يؤول h إلى 0. هندسياً، يمثل معامل توجيه المماس للمنحنى (C_f) عند النقطة ذات الفاصلة x₀.',
      formulaTex: 'f\'(x_0) = \\lim_{h \\to 0} \\frac{f(x_0 + h) - f(x_0)}{h}',
      formulaDescription: 'معادلة مماس المنحنى (C_f) عند النقطة ذات الفاصلة x₀ هي: y = f\'(x₀)(x - x₀) + f(x₀).',
      properties: [
        {
          label: 'مشتق دالة القوة x^n',
          formulaTex: '(x^n)\' = n x^{n-1} \\quad (n \\in \\mathbb{N}^*)',
          note: 'مثال: (x^4)\' = 4x^3 و (5x^2)\' = 10x'
        },
        {
          label: 'مشتق حاصل جداء دالتين (u · v)',
          formulaTex: '(u \\cdot v)\' = u\'v + uv\'',
          note: 'احذر من كتابة u\'v\''
        },
        {
          label: 'مشتق حاصل قسمة دالتين (u / v)',
          formulaTex: '\\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2} \\quad (v \\neq 0)',
          note: 'تنبيه للإشارة السالبة في البسط'
        },
        {
          label: 'مشتق الجذر التربيعي √x',
          formulaTex: '(\\sqrt{x})\' = \\frac{1}{2\\sqrt{x}} \\quad (x > 0)',
          note: 'الدالة √x غير قابلة للاشتقاق عند 0 من اليمين'
        }
      ],
      keyTheorem: {
        title: 'تذكير وزاري لمنهجية البكالوريا',
        statement: 'قبل اشتقاق أي دالة في البكالوريا، يجب أولاً تبرير قابلية الاشتقاق بذكر: الدالة f قابلة للاشتقاق على مجال تعريفها I لأنها عبارة عن (مجموع/جداء/حاصل قسمة/مركب) دوال قابلة للاشتقاق.',
        mathTex: '(C_f) : y = f\'(x_0)(x - x_0) + f(x_0)'
      }
    },
    workedExamples: [
      {
        id: 'diag-ex-1',
        title: 'مثال: تعيين معادلة المماس عند نقطة الفاصلة x₀ = 1',
        problemStatement: 'لتكن الدالة f المعرفة على ℝ بالعبارة f(x) = x³ - 3x + 2. احسب f\'(1) ثم اكتب معادلة المماس (T) لـ (C_f) عند النقطة ذات الفاصلة 1.',
        problemMath: 'f(x) = x^3 - 3x + 2',
        steps: [
          {
            stepNumber: 1,
            explanation: 'f دالة كثيرة حدود قابلة للاشتقاق على ℝ، نحسب مشتقتها f\'(x):',
            mathExpression: 'f\'(x) = 3x^2 - 3'
          },
          {
            stepNumber: 2,
            explanation: 'نعوض x = 1 في عبارتي f و f\':',
            mathExpression: 'f(1) = 1^3 - 3(1) + 2 = 0 \\quad \\text{و} \\quad f\'(1) = 3(1)^2 - 3 = 0'
          },
          {
            stepNumber: 3,
            explanation: 'نكتب معادلة المماس (T):',
            mathExpression: 'y = f\'(1)(x - 1) + f(1) = 0(x - 1) + 0 \\implies y = 0'
          }
        ],
        finalAnswer: 'المماس أفقي ومعادلته:',
        finalAnswerMath: '(T) : y = 0 \\quad (\\text{محور الفواصل})',
        bacTip: 'عندما يكون f\'(x₀) = 0 فإن المماس يكون أفقياً وموازياً لمحور الفواصل، وهي نقطة يحتمل أن تكون قيمة حدية محلية أو نقطة انعطاف.'
      }
    ]
  },

  // 2. الاستمرارية والعدد المشتق والمماس
  'continuity-derivatives-basics': {
    id: 'lesson-continuity-basics',
    conceptId: 'continuity-derivatives-basics',
    title: 'الاشتقاقية والاستمرارية: استمرار دالة، العدد المشتق ومعادلة المماس',
    videoUrl: 'https://www.youtube.com/watch?v=example-continuity',
    videoTitle: 'الاستمرارية وقابلية الاشتقاق والتفسيرات الهندسية لنصف المماس والمماس العمودي',
    videoDuration: '16:30',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 60,
    objectives: [
      'فهم معنى استمرار دالة عند نقطة: lim_{x -> x₀} f(x) = f(x₀).',
      'التمييز بين قابلية الاشتقاق والاستمرارية (كل دالة قابلة للاشتقاق مستمرة، والعكس غير صحيح).',
      'التفسير الهندسي لعدم قابلية الاشتقاق: نقطة زاوية (نصفا مماس مختلفان)، مماس عمودي، ونقطة توقف.',
      'كتابة معادلة المماس الموازي لمستقيم معلوم التوجيه y = ax + b.'
    ],
    theory: {
      title: 'تعريف الاستمرارية والعلاقة مع الاشتقاقية',
      summary: 'نقول عن دالة f أنها مستمرة عند x₀ إذا وفقط إذا كانت معرفة عند x₀ وكانت نهاية f(x) لما x يؤول إلى x₀ تساوي f(x₀). وتكون مستمرة على مجال I إذا كانت مستمرة عند كل نقطة من I (يرسم منحناها دون رفع القلم).',
      formulaTex: '\\lim_{x \\to x_0} f(x) = f(x_0)',
      formulaDescription: 'كل دالة قابلة للاشتقاق عند x₀ هي بالضرورة مستمرة عند x₀.',
      properties: [
        {
          label: 'نقطة الزاوية (Point Anguleux)',
          formulaTex: 'f\'_g(x_0) \\neq f\'_d(x_0)',
          note: 'المنحنى يقبل نصفي مماس بمعاملين مختلفين مثل f(x) = |x| عند 0.'
        },
        {
          label: 'مماس عمودي (نهاية غير منتهية)',
          formulaTex: '\\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0} = \\pm\\infty',
          note: 'المنحنى يقبل نصف مماس عمودي موازي لمحور التراتيب معادلته x = x₀.'
        },
        {
          label: 'المماس الموازي لمستقيم ذي معامل توجيه m',
          formulaTex: 'f\'(x_0) = m',
          note: 'نحل المعادلة f\'(x) = m لإيجاد فواصل نقط التماس.'
        }
      ],
      keyTheorem: {
        title: 'نصيحة بكالوريا حاسمة',
        statement: 'إذا طلب منك إثبات وجود مماس لـ (C_f) مواز للمستقيم (D): y = mx + p، قم بحل المعادلة f\'(x) = m. عدد الحلول يمثل عدد المماسات الموازية.',
        mathTex: 'f\'(x) = m \\iff x = x_0'
      }
    },
    workedExamples: [
      {
        id: 'cont-ex-1',
        title: 'مثال: تعيين نقط التماس التي يكون فيها المماس موازياً للمستقيم y = 4x - 1',
        problemStatement: 'لتكن f(x) = x³ + x² - x + 1. عين فواصل النقط التي يقبل فيها (C_f) مماساً موازياً للمستقيم (Δ): y = 4x - 1.',
        problemMath: 'f\'(x) = 4',
        steps: [
          {
            stepNumber: 1,
            explanation: 'نحسب المشتقة f\'(x):',
            mathExpression: 'f\'(x) = 3x^2 + 2x - 1'
          },
          {
            stepNumber: 2,
            explanation: 'المماس يوازي (Δ) معناه معامل توجيهه يساوي 4، إذن نحل f\'(x) = 4:',
            mathExpression: '3x^2 + 2x - 1 = 4 \\implies 3x^2 + 2x - 5 = 0'
          },
          {
            stepNumber: 3,
            explanation: 'نحسب المميز Δ للمقررة:',
            mathExpression: '\\Delta = (2)^2 - 4(3)(-5) = 4 + 60 = 64 = 8^2'
          },
          {
            stepNumber: 4,
            explanation: 'إيجاد الحلين x₁ و x₂:',
            mathExpression: 'x_1 = \\frac{-2 - 8}{6} = -\\frac{5}{3} \\quad , \\quad x_2 = \\frac{-2 + 8}{6} = 1'
          }
        ],
        finalAnswer: 'يوجد مماسان عند الفاصلتين:',
        finalAnswerMath: 'x_1 = -\\frac{5}{3} \\quad \\text{و} \\quad x_2 = 1',
        bacTip: 'في ورقة الإجابة، اذكر بوضوح أن شرط التوازي هو تساوي معاملي التوجيه f\'(x) = m.'
      }
    ]
  },

  // 3. مبرهنة القيم المتوسطة TVI
  'mean-value-theorem': {
    id: 'lesson-mean-value-theorem',
    conceptId: 'mean-value-theorem',
    title: 'مبرهنة القيم المتوسطة (TVI) وإثبات وجود حلول للمعادلة f(x) = k',
    videoUrl: 'https://www.youtube.com/watch?v=tvi-bac-math',
    videoTitle: 'شرح مبرهنة القيم المتوسطة وطرق الحصر وخوارزمية التنصيف في البكالوريا',
    videoDuration: '15:10',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 60,
    objectives: [
      'فهم نص مبرهنة القيم المتوسطة وشروط تطبيقها (الاستمرارية والرتابة التامة).',
      'إثبات أن المعادلة f(x) = 0 أو f(x) = k تقبل حلاً وحيداً α في مجال [a, b].',
      'إيجاد حصر للحل α بدقة 10⁻¹ أو 10⁻² باستخدام الآلة الحاسبة (طريقة المسح أو التنصيف).',
      'استنتاج إشارة f(x) اعتماداً على الحل α وجدول التغيرات.'
    ],
    theory: {
      title: 'نص مبرهنة القيم المتوسطة وحالة الرتابة التامة',
      summary: 'إذا كانت f دالة مستمرة ورتيبة تماماً (متزايدة تماماً أو متناقصة تماماً) على مجال [a, b]، وكان العدد k محصوراً بين f(a) و f(b)، فإن المعادلة f(x) = k تقبل حلاً وحيداً α في المجال ]a, b[.',
      formulaTex: 'f(a) \\cdot f(b) < 0 \\implies \\exists! \\alpha \\in ]a, b[ : f(\\alpha) = 0',
      formulaDescription: 'الشرطان الأساسيان للحل الوحيد: 1) الاستمرارية على [a, b] 2) الرتابة التامة على [a, b].',
      properties: [
        {
          label: 'حالة f(x) = 0 الخاصة',
          formulaTex: 'f(a) \\cdot f(b) < 0',
          note: 'القيمتان f(a) و f(b) من إشارتين مختلفتين (إحداهما موجبة والأخرى سالبة).'
        },
        {
          label: 'استنتاج إشارة f(x) بعد إثبات f(α) = 0',
          formulaTex: 'x < \\alpha \\implies f(x) < 0 \\quad \\text{و} \\quad x > \\alpha \\implies f(x) > 0 \\quad (\\text{إذا كانت } f \\text{ متزايدة})',
          note: 'هذا الاستنتاج أساسي لدراسة إشارة مشتقة دالة أخرى في الجزء الثاني من مسألة البكالوريا.'
        }
      ],
      keyTheorem: {
        title: 'العبارة النموذجية المصححة في البكالوريا',
        statement: 'نكتب: "الدالة f مستمرة ورتيبة تماماً (متزايدة تماماً مثلاً) على المجال [a, b]، وبما أن f(a) < 0 و f(b) > 0 (أي f(a)·f(b) < 0)، فحسب مبرهنة القيم المتوسطة، المعادلة f(x) = 0 تقبل حلاً وحيداً α حيث α ∈ ]a, b[".',
        mathTex: '\\exists! \\alpha \\in ]a, b[ \\quad f(\\alpha) = k'
      }
    },
    workedExamples: [
      {
        id: 'tvi-ex-1',
        title: 'مثال بكالوريا: إثبات أن x³ + 2x - 1 = 0 تقبل حلاً وحيداً في ]0, 1[',
        problemStatement: 'لتكن f(x) = x³ + 2x - 1. بين أن المعادلة f(x) = 0 تقبل حلاً وحيداً α على المجال ]0, 1[، ثم اعط حصراً لـ α بسعة 0.1.',
        problemMath: 'f(x) = x^3 + 2x - 1',
        steps: [
          {
            stepNumber: 1,
            explanation: 'f دالة كثيرة حدود مستمرة وقابلة للاشتقاق على ℝ. نحسب مشتقتها:',
            mathExpression: 'f\'(x) = 3x^2 + 2 > 0 \\quad (\\forall x \\in \\mathbb{R})'
          },
          {
            stepNumber: 2,
            explanation: 'بما أن f\'(x) > 0، فإن f متزايدة تماماً على المجال [0, 1]:',
            mathExpression: 'f(0) = -1 < 0 \\quad \\text{و} \\quad f(1) = 1 + 2 - 1 = 2 > 0'
          },
          {
            stepNumber: 3,
            explanation: 'f مستمرة ومتزايدة تماماً و f(0)·f(1) = (-1)(2) = -2 < 0، فحسب مبرهنة القيم المتوسطة يوجد حل وحيد α ∈ ]0, 1[ يحقق f(α) = 0.',
            mathExpression: 'f(0) \\cdot f(1) < 0 \\implies \\alpha \\in ]0, 1['
          },
          {
            stepNumber: 4,
            explanation: 'باستخدام المسح بـ 0.1 نجد f(0.4) = -0.136 و f(0.5) = 0.125:',
            mathExpression: 'f(0.4) < 0 < f(0.5) \\implies 0.4 < \\alpha < 0.5'
          }
        ],
        finalAnswer: 'الحصر بسعة 0.1 هو:',
        finalAnswerMath: '0.4 < \\alpha < 0.5',
        bacTip: 'تأكد من كتابة الشروط كاملة: الاستمرارية + الرتابة التامة + اختلاف الإشارة، ولا تنس ذكر اسم المبرهنة.'
      }
    ]
  },

  // 4. مشتق دالة مركبة والمشتقات المتتابعة
  'chain-rule': {
    id: 'lesson-chain-rule',
    conceptId: 'chain-rule',
    title: 'حساب مشتق دالة مركبة والمشتقات المتتابعة (Chain Rule)',
    videoUrl: 'https://www.youtube.com/watch?v=H-ybCx8gt-8',
    videoTitle: 'شرح مبسط لقاعدة السلسلة واشتقاق الدوال المركبة والمشتقة الثانية في البكالوريا',
    videoDuration: '14:20',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 60,
    objectives: [
      'فهم المفهوم الهندسي والجبري لتركيب دالتين وكيفية انتقال معدل التغير.',
      'تطبيق المبرهنة العامة لاشتقاق دالة مركبة (g ∘ f)\'(x) = f\'(x) · g\'(f(x)).',
      'إتقان الحالات الخاصة الشهيرة في البكالوريا: [u(x)]^n و √(u(x)) وقوة كسر ناطق.',
      'حساب المشتقات المتتابعة (المشتقة الثانية f\'\'(x)) وتوظيفها في إثبات نقطة الانعطاف.'
    ],
    theory: {
      title: 'الشرح النظري والمبرهنة الأساسية',
      summary: 'إذا كانت الدالة f قابلة للاشتقاق على مجال I وتأخذ قيمها في مجال J، وكانت الدالة g قابلة للاشتقاق على J، فإن الدالة المركبة g ∘ f قابلة للاشتقاق على I.',
      formulaTex: '(g \\circ f)\'(x) = f\'(x) \\cdot g\'(f(x))',
      formulaDescription: 'المشتق الكلي يساوي: مشتق الدالة الداخلية مضروباً في مشتق الدالة الخارجية مقيماً عند الدالة الداخلية.',
      properties: [
        {
          label: 'قوة دالة قابلة للاشتقاق [u(x)]^n',
          formulaTex: '([u(x)]^n)\' = n \\cdot u\'(x) \\cdot [u(x)]^{n-1}',
          note: 'صالحة لكل n ∈ ℤ* ولكل n ∈ ℝ* بشرط u(x) > 0'
        },
        {
          label: 'مشتق الجذر التربيعي لدالة √(u(x))',
          formulaTex: '(\\sqrt{u(x)})\' = \\frac{u\'(x)}{2\\sqrt{u(x)}}',
          note: 'بشرط أن تكون u قابلة للاشتقاق وموجبة تماماً: u(x) > 0'
        },
        {
          label: 'المشتقة الثانية f\'\'(x)',
          formulaTex: 'f\'\'(x) = (f\'(x))\'',
          note: 'إذا انعدمت f\'\'(x) عند x₀ وغيرت إشارتها، فإن النقطة (x₀, f(x₀)) نقطة انعطاف.'
        }
      ],
      keyTheorem: {
        title: 'نصيحة ذهبية للبكالوريا (Méthode BAC)',
        statement: 'عند اشتقاق أي دالة معقدة، حدد أولاً الدالة الخارجية g والدالة الداخلية u = f(x). احسب u\'(x) على حدة، ثم احسب g\'(u) وعوض u بعبارتها الأصلية.',
        mathTex: '\\text{Pour } y = g(u) \\text{ avec } u = f(x) \\implies \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}'
      }
    },
    workedExamples: [
      {
        id: 'chain-ex-1',
        title: 'مثال 01: اشتقاق دالة قوى كثيرة حدود [u(x)]^n',
        problemStatement: 'احسب الدالة المشتقة للدالة f المعرفة على ℝ بالعبارة: f(x) = (2x³ - 5x + 1)⁴.',
        problemMath: 'f(x) = (2x^3 - 5x + 1)^4',
        steps: [
          {
            stepNumber: 1,
            explanation: 'نحدد الدالة الداخلية u(x) ونحسب مشتقتها u\'(x):',
            mathExpression: 'u(x) = 2x^3 - 5x + 1 \\implies u\'(x) = 6x^2 - 5'
          },
          {
            stepNumber: 2,
            explanation: 'نطبق قاعدة القوة ([u]^n)\' = n · u\' · u^(n-1) مع n = 4:',
            mathExpression: 'f\'(x) = 4 \\cdot (6x^2 - 5) \\cdot (2x^3 - 5x + 1)^3'
          },
          {
            stepNumber: 3,
            explanation: 'نبسط العبارة بضرب العامل 4 في القوس الأول دون نشر القوس التكعيبي:',
            mathExpression: 'f\'(x) = (24x^2 - 20)(2x^3 - 5x + 1)^3',
            hint: 'الحفاظ على شكل الجداء يسهل لاحقاً دراسة إشارة المشتقة وتحديد اتجاه التغير.'
          }
        ],
        finalAnswer: 'الدالة المشتقة هي:',
        finalAnswerMath: 'f\'(x) = (24x^2 - 20)(2x^3 - 5x + 1)^3',
        bacTip: 'في البكالوريا، اترك العبارة في شكل جداء عوامل ولا تنشر القوس التكعيبي، لأن دراسة الإشارة تكون أسهل بكثير في شكل الجداء.'
      },
      {
        id: 'chain-ex-2',
        title: 'مثال 02: اشتقاق دالة كسرية جذرية √(u(x))',
        problemStatement: 'احسب الدالة المشتقة للدالة g المعرفة على المجال ]1, +∞[ بالعبارة: g(x) = √( (3x + 1) / (x - 1) ).',
        problemMath: 'g(x) = \\sqrt{\\frac{3x + 1}{x - 1}}',
        steps: [
          {
            stepNumber: 1,
            explanation: 'نضع ما بداخل الجذر كدالة u(x) ونشتقها بقاعدة مشتق الكسر (u/v)\':',
            mathExpression: 'u(x) = \\frac{3x+1}{x-1} \\implies u\'(x) = \\frac{3(x-1) - 1(3x+1)}{(x-1)^2} = \\frac{-4}{(x-1)^2}'
          },
          {
            stepNumber: 2,
            explanation: 'نطبق قانون مشتق الجذر (√u)\' = u\' / (2√u):',
            mathExpression: 'g\'(x) = \\frac{ \\frac{-4}{(x-1)^2} }{ 2\\sqrt{\\frac{3x+1}{x-1}} } = \\frac{-2}{(x-1)^2 \\sqrt{\\frac{3x+1}{x-1}}}'
          },
          {
            stepNumber: 3,
            explanation: 'استنتاج إشارة المشتقة g\'(x) على مجال التعريف:',
            mathExpression: '\\forall x \\in ]1, +\\infty[, \\quad g\'(x) < 0',
            hint: 'بما أن المقام موجب تماماً والبسط سالب (-2)، فإن الدالة g متناقصة تماماً.'
          }
        ],
        finalAnswer: 'الدالة المشتقة g\'(x) هي:',
        finalAnswerMath: 'g\'(x) = \\frac{-2}{(x-1)^2 \\sqrt{\\frac{3x+1}{x-1}}}',
        bacTip: 'تأكد دائماً من كتابة شرط قابلية اشتقاق الدالة الجذرية (أن تكون الدالة التي تحت الجذر موجبة تماماً وقابلة للاشتقاق).'
      },
      {
        id: 'chain-ex-3',
        title: 'مثال 03: المشتقات المتتابعة وإثبات نقطة الانعطاف f\'\'(x)',
        problemStatement: 'لتكن الدالة h المعرفة على ℝ بـ: h(x) = x⁴ - 6x² + 5x - 3. احسب h\'(x) ثم h\'\'(x) وعيّن فواصل نقط الانعطاف لمنحناها.',
        problemMath: 'h(x) = x^4 - 6x^2 + 5x - 3',
        steps: [
          {
            stepNumber: 1,
            explanation: 'حساب المشتقة الأولى h\'(x) لاشتقاق كثير الحدود:',
            mathExpression: 'h\'(x) = 4x^3 - 12x + 5'
          },
          {
            stepNumber: 2,
            explanation: 'حساب المشتقة الثانية h\'\'(x) بإعادة اشتقاق h\'(x):',
            mathExpression: 'h\'\'(x) = 12x^2 - 12 = 12(x^2 - 1) = 12(x - 1)(x + 1)'
          },
          {
            stepNumber: 3,
            explanation: 'تعيين إشارة h\'\'(x) وحل المعادلة h\'\'(x) = 0:',
            mathExpression: 'h\'\'(x) = 0 \\iff x_1 = -1, \\quad x_2 = 1',
            hint: 'المشتقة الثانية تنعدم وتغير إشارتها عند -1 وعند 1 (موجبة خارج الحلين وسالبة بينهما)، مما يثبت وجود نقطتي انعطاف للمنحنى.'
          }
        ],
        finalAnswer: 'فواصل نقطتي الانعطاف هما:',
        finalAnswerMath: 'x_1 = -1, \\quad x_2 = 1',
        bacTip: 'لكي تكون النقطة نقطة انعطاف يجب ذكر الشرط كاملاً: تنعدم المشتقة الثانية وتغير إشارتها عند تلك الفاصلة.'
      }
    ]
  },

  // 5. خواص دالة والتقريب الخطي ونقطة الانعطاف
  'function-properties-tangents': {
    id: 'lesson-properties-tangents',
    conceptId: 'function-properties-tangents',
    title: 'استعمال المشتقات لدراسة خواص دالة: التقريب الخطي ونقطة الانعطاف',
    videoUrl: 'https://www.youtube.com/watch?v=approx-linear',
    videoTitle: 'التقريب التآلفي الخطي وطرق إثبات نقطة الانعطاف في البكالوريا',
    videoDuration: '15:40',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 60,
    objectives: [
      'حساب التقريب التآلفي الخطي لدالة بجوار نقطة: f(x₀ + h) ≈ f(x₀) + h f\'(x₀).',
      'التعرف على الطرق الثلاث لإثبات نقطة الانعطاف: المشتقة الأولى تنعدم ولا تغير إشارتها، أو المشتقة الثانية تنعدم وتغير إشارتها، أو المماس يخترق المنحنى.',
      'دراسة التحدب والتقعر (f دالة محدبة إذا كانت f\'\'(x) ≥ 0، ومقعرة إذا كانت f\'\'(x) ≤ 0).'
    ],
    theory: {
      title: 'التقريب التآلفي ونقاط الانعطاف',
      summary: 'التقريب التآلفي يمكننا من تعويض منحنى دالة معقدة بمستقيم المماس بجوار النقطة x₀ عندما يكون h قريباً جداً من الصفر.',
      formulaTex: 'f(x_0 + h) \\approx f(x_0) + h f\'(x_0) \\quad (h \\to 0)',
      formulaDescription: 'نقطة الانعطاف هي النقطة التي يغير فيها المنحنى اتجاه تقعره ويخترق المماس عندها المنحنى.',
      properties: [
        {
          label: 'الطريقة الأولى لنقطة الانعطاف (المشتقة الأولى)',
          formulaTex: 'f\'(x_0) = 0 \\quad \\text{مع ثبات إشارة } f\'(x) \\text{ على يمين ويسار } x_0',
          note: 'المماس أفقي ويخترق المنحنى عند النقطة (x₀, f(x₀)).'
        },
        {
          label: 'الطريقة الثانية لنقطة الانعطاف (المشتقة الثانية)',
          formulaTex: 'f\'\'(x_0) = 0 \\quad \\text{و } f\'\'(x) \\text{ تغير إشارتها عند } x_0',
          note: 'وهي الطريقة الأكثر استخداماً في مواضيع شعبتي الرياضيات والتقني رياضي.'
        }
      ],
      keyTheorem: {
        title: 'قاعدة البكالوريا لتحديد نقطة الانعطاف',
        statement: 'إذا كان f\'\'(x) < 0 على ]-∞, x₀[ و f\'\'(x) > 0 على ]x₀, +∞[، فإن المنحنى ينتقل من تقعر نحو الأسفل إلى تقعر نحو الأعلى، والنقطة A(x₀, f(x₀)) هي نقطة انعطاف.',
        mathTex: 'f\'\'(x) = 0 \\implies A(x_0, f(x_0)) \\text{ point d\'inflexion}'
      }
    },
    workedExamples: [
      {
        id: 'prop-ex-1',
        title: 'مثال: حساب قيمة تقريبية للعدد √(1.002) دون آلة حاسبة',
        problemStatement: 'باستعمال التقريب التآلفي للدالة f(x) = √x عند x₀ = 1، اعط قيمة مقربة لـ √(1.002).',
        problemMath: 'f(1 + 0.002) \\approx f(1) + 0.002 f\'(1)',
        steps: [
          {
            stepNumber: 1,
            explanation: 'لدينا f(x) = √x ومنه f(1) = 1، والمشتقة f\'(x) = 1 / (2√x) ومنه f\'(1) = 1/2 = 0.5:',
            mathExpression: 'f(1) = 1 \\quad , \\quad f\'(1) = 0.5'
          },
          {
            stepNumber: 2,
            explanation: 'نضع h = 0.002 ونطبق صيغة التقريب التآلفي:',
            mathExpression: 'f(1 + h) \\approx f(1) + h f\'(1) = 1 + 0.002(0.5) = 1 + 0.001 = 1.001'
          }
        ],
        finalAnswer: 'القيمة التقريبية هي:',
        finalAnswerMath: '\\sqrt{1.002} \\approx 1.001',
        bacTip: 'هذا السؤال يظهر غالباً في أسئلة الفهم السريع لاختبار استيعاب المفهوم الهندسي للمشتق.'
      }
    ]
  },

  // 6. تابع الخواص وجدول التغيرات ونقط الانعطاف
  'function-variation-inflection': {
    id: 'lesson-variation-inflection',
    conceptId: 'function-variation-inflection',
    title: 'تابع دراسة خواص دالة، جدول التغيرات ونقط الانعطاف',
    videoUrl: 'https://www.youtube.com/watch?v=variation-table',
    videoTitle: 'بناء جدول التغيرات الشامل والتعامل مع القيم الحدية في البكالوريا',
    videoDuration: '17:00',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 60,
    objectives: [
      'إتقان ربط إشارة المشتقة f\'(x) برتابة الدالة f (متزايدة تماماً أو متناقصة تماماً).',
      'كتابة جدول التغيرات الكامل بملء النهايات والقيم الحدية وحالات عدم التعريف بدقة.',
      'تحديد القيم الحدية المحلية العظمى والصغرى وقراءة جدول التغيرات بطريقة عكسية.'
    ],
    theory: {
      title: 'جدول التغيرات والرتابة',
      summary: 'إذا كانت f\'(x) > 0 على مجال I فإن f متزايدة تماماً على I. وإذا كانت f\'(x) < 0 على I فإن f متناقصة تماماً على I. وإذا كانت f\'(x) = 0 على I فإن f دالة ثابتة على I.',
      formulaTex: 'f\'(x) \\ge 0 \\implies f \\nearrow \\quad \\text{و} \\quad f\'(x) \\le 0 \\implies f \\searrow',
      formulaDescription: 'تنعدم f\'(x) وتغير إشارتها من الموجب إلى السالب عند x₀ يعني أن f(x₀) قيمة حدية عظمى محلية.',
      properties: [
        {
          label: 'قيمة حدية عظمى محلية (Maximum Local)',
          formulaTex: 'f\'(x) > 0 \\text{ على اليسار و } f\'(x) < 0 \\text{ على اليمين}',
          note: 'f(x₀) هي أعلى نقطة في الجوار.'
        },
        {
          label: 'قيمة حدية صغرى محلية (Minimum Local)',
          formulaTex: 'f\'(x) < 0 \\text{ على اليسار و } f\'(x) > 0 \\text{ على اليمين}',
          note: 'f(x₀) هي أدنى نقطة في الجوار.'
        }
      ],
      keyTheorem: {
        title: 'تنبيه حول درجات التنقيط في البكالوريا',
        statement: 'في جدول التغيرات، تنقط كل خانة: إشارة المشتقة، الأسهم، النهايات عند الأطراف، والقيم عند النقط المعرفة. إغفال كتابة نهاية أو قيمة يفقدك أجزاء من النقطة.',
        mathTex: '\\text{Tableau de variation complet} : x \\mid f\'(x) \\mid f(x)'
      }
    },
    workedExamples: [
      {
        id: 'var-ex-1',
        title: 'مثال: دراسة اتجاه تغير f(x) = x⁴ - 4x² + 3',
        problemStatement: 'ادرس اتجاه تغير الدالة f المعرفة على ℝ بالعبارة f(x) = x⁴ - 4x² + 3 وشكل جدول تغيراتها.',
        problemMath: 'f\'(x) = 4x^3 - 8x = 4x(x^2 - 2)',
        steps: [
          {
            stepNumber: 1,
            explanation: 'نحسب المشتقة ونحللها إلى جداء عوامل:',
            mathExpression: 'f\'(x) = 4x(x - \\sqrt{2})(x + \\sqrt{2})'
          },
          {
            stepNumber: 2,
            explanation: 'المشتقة تنعدم عند: x = -√2 و x = 0 و x = √2:',
            mathExpression: 'f(-\\sqrt{2}) = -1 \\quad , \\quad f(0) = 3 \\quad , \\quad f(\\sqrt{2}) = -1'
          },
          {
            stepNumber: 3,
            explanation: 'الدالة زوجية، متناقصة على ]-∞, -√2] و [0, √2]، ومتزايدة على [-√2, 0] و [√2, +∞[.',
            mathExpression: '\\lim_{x \\to \\pm\\infty} f(x) = +\\infty'
          }
        ],
        finalAnswer: 'القيمتان الحديتان الصغريان هما -1، والقيمة العظمى هي 3.',
        finalAnswerMath: 'f(\\pm\\sqrt{2}) = -1 \\quad (\\text{Min}) \\quad , \\quad f(0) = 3 \\quad (\\text{Max})',
        bacTip: 'ملاحظة شفعية الدالة (زوجية أو فردية) تمكنك من التحقق الفوري من صحة الحسابات وتناظر المنحنى.'
      }
    ]
  },

  // 7. توظيف المشتقات لحل مشكلات (كثيرات حدود، ناطقة، صماء)
  'problem-solving-derivatives': {
    id: 'lesson-problem-solving',
    conceptId: 'problem-solving-derivatives',
    title: 'توظيف المشتقات لحل مشكلات (دوال كثيرات حدود، ناطقة، وصماء)',
    videoUrl: 'https://www.youtube.com/watch?v=problem-solving-derivatives',
    videoTitle: 'استراتيجية المسائل الشاملة والدالة المساعدة g(x) في مواضيع البكالوريا',
    videoDuration: '19:15',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 65,
    objectives: [
      'إتقان هيكل المسألة النموذجية للبكالوريا: الجزء الأول (دراسة إشارة g(x)) والجزء الثاني (دراسة f(x) حيث f\'(x) = g(x)/d(x)).',
      'التعامل مع الدوال الناطقة الكسرية والمقامات من الدرجة الثانية والثالثة.',
      'دراسة الدوال الصماء الجذرية وحساب مشتقاتها وإزالة عدم التعيين باستخدام المرافق.',
      'ربط مبرهنة القيم المتوسطة بإشارة الدالة المساعدة وحصر عبارة f(α).'
    ],
    theory: {
      title: 'الهندسة المنهجية للمسألة الشاملة (Structure BAC)',
      summary: 'في 90% من مواضيع البكالوريا، يعطى جزء أول لدراسة دالة مساعدة g(x) وإثبات أن g(α) = 0 واستنتاج إشارتها، ثم في الجزء الثاني تدرس الدالة الرئيسية f(x) حيث يظهر g(x) في بسط المشتقة f\'(x).',
      formulaTex: 'f\'(x) = \\frac{g(x)}{(x^2+1)^2} \\implies \\text{Signe de } f\'(x) = \\text{Signe de } g(x)',
      formulaDescription: 'المقام موجب تماماً، إذن إشارة f\'(x) هي نفسها إشارة g(x) المدروسة في الجزء الأول.',
      properties: [
        {
          label: 'حساب f(α) بدلالة α',
          formulaTex: 'g(\\alpha) = 0 \\implies \\alpha^3 + \\dots = 0 \\implies f(\\alpha) = \\frac{2\\alpha}{\\alpha+1}',
          note: 'نعوض العلاقات المستخرجة من g(α) = 0 داخل عبارة f(α) للتخلص من الأس العالي أو الدالة المعقدة.'
        },
        {
          label: 'حصر f(α)',
          formulaTex: 'a < \\alpha < b \\implies f(a) < f(\\alpha) < f(b)',
          note: 'إذا كانت العبارة المبسطة رتيبة تماماً بدلالة α.'
        }
      ],
      keyTheorem: {
        title: 'نصيحة ذهبية لمنهجية الحل',
        statement: 'إذا عجزت عن حل سؤال في الجزء الأول، يمكنك استخدام النتيجة المعطاة (مثل إشارة g(x) أو حصر α) لمواصلة حل الجزء الثاني كاملاً دون خسارة نقاطه.',
        mathTex: 'g(\\alpha) = 0 \\implies \\text{Signe de } g(x) : \\begin{cases} g(x) < 0 & (x < \\alpha) \\\\ g(x) > 0 & (x > \\alpha) \\end{cases}'
      }
    },
    workedExamples: [
      {
        id: 'ps-ex-1',
        title: 'مثال: ربط إشارة g(x) بمشتقة الدالة الناطقة f(x)',
        problemStatement: 'لتكن g(x) = 2x³ + x² - 1 سالبة على ]-∞, 1[ وموجبة على ]1, +∞[ وتنعدم عند 1. لتكن f(x) = (x³ + x - 1)/(x - 1). بين أن f\'(x) = g(x)/(x - 1)².',
        problemMath: 'f\'(x) = \\frac{g(x)}{(x-1)^2}',
        steps: [
          {
            stepNumber: 1,
            explanation: 'نشتق f(x) كحاصل قسمة دالتين (u/v)\' = (u\'v - uv\')/v²:',
            mathExpression: 'u(x) = x^3 + x - 1 \\implies u\'(x) = 3x^2 + 1 \\quad , \\quad v(x) = x - 1 \\implies v\'(x) = 1'
          },
          {
            stepNumber: 2,
            explanation: 'نحسب البسط وننشره:',
            mathExpression: '(3x^2 + 1)(x - 1) - (x^3 + x - 1)(1) = 3x^3 - 3x^2 + x - 1 - x^3 - x + 1 = 2x^3 - 3x^2'
          },
          {
            stepNumber: 3,
            explanation: 'نلاحظ أن البسط هو تماماً g(x)، وبما أن (x-1)² > 0، فإن إشارة f\'(x) من إشارة g(x):',
            mathExpression: 'f\'(x) = \\frac{g(x)}{(x-1)^2}'
          }
        ],
        finalAnswer: 'إشارة f\'(x) تماثل إشارة g(x):',
        finalAnswerMath: 'f\'(x) < 0 \\text{ على } ]-\\infty, 1[ \\quad \\text{و} \\quad f\'(x) > 0 \\text{ على } ]1, +\\infty[',
        bacTip: 'هذا الربط يمثل العمود الفقري لجميع مواضيع البكالوريا في الدوال.'
      }
    ]
  },

  // 8. المشتقات والدوال المثلثية والمعادلات التفاضلية
  'trig-derivatives-diff-equations': {
    id: 'lesson-trig-diff-eq',
    conceptId: 'trig-derivatives-diff-equations',
    title: 'توظيف المشتقات لدراسة الدوال المثلثية والمعادلات التفاضلية البسيطة',
    videoUrl: 'https://www.youtube.com/watch?v=trig-derivatives',
    videoTitle: 'مشتقات الدوال المثلثية وحل المعادلات التفاضلية y\' = f(x) و y\'\' = f(x)',
    videoDuration: '16:45',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 70,
    objectives: [
      'اشتقاق الدوال المثلثية البسيطة والمركبة: (sin u)\' = u\' cos u و (cos u)\' = -u\' sin u.',
      'دراسة الحركة الاهتزازية الجيبية t ↦ a sin(ωt + φ) وحساب السرعة والتسارع كمشتقات.',
      'حل المعادلات التفاضلية البسيطة من الشكل y\' = f(x) بالبحث عن الدوال الأصلية.',
      'حل المعادلات التفاضلية من الشكل y\'\' = f(x) وتعيين الحل الذي يحقق الشروط الابتدائية.'
    ],
    theory: {
      title: 'قواعد اشتقاق الدوال المثلثية والمعادلات التفاضلية',
      summary: 'مشتق الدالة sin x هو cos x، ومشتق الدالة cos x هو -sin x. المعادلة التفاضلية y\' = f(x) حلها العام هو مجموعة الدوال الأصلية F(x) + c حيث c ثابت حقيقي.',
      formulaTex: '(\\sin(\\omega t + \\varphi))\' = \\omega \\cos(\\omega t + \\varphi) \\quad \\text{و} \\quad (\\cos(\\omega t + \\varphi))\' = -\\omega \\sin(\\omega t + \\varphi)',
      formulaDescription: 'حل المعادلة التفاضلية y\'\' = -ω² y هو: y(t) = A cos(ωt) + B sin(ωt).',
      properties: [
        {
          label: 'حل المعادلة التفاضلية y\' = f(x)',
          formulaTex: 'y(x) = F(x) + C \\quad (C \\in \\mathbb{R})',
          note: 'حيث F هي دالة أصلية للدالة f على المجال المعني.'
        },
        {
          label: 'حل المعادلة التفاضلية y\'\' = f(x)',
          formulaTex: 'y(x) = G(x) + C_1 x + C_2 \\quad (C_1, C_2 \\in \\mathbb{R})',
          note: 'نكامل مرتين متتاليتين، مع إيجاد C₁ و C₂ من الشروط الابتدائية.'
        }
      ],
      keyTheorem: {
        title: 'الربط الفيزيائي والرياضياتي',
        statement: 'في الحركة التوافقية البسيطة (النواس، الدارة LC)، الموضع x(t) = X_max cos(ωt + φ)، والسرعة v(t) = x\'(t)، والتسارع a(t) = x\'\'(t) = -ω² x(t).',
        mathTex: 'x\'\'(t) + \\omega^2 x(t) = 0'
      }
    },
    workedExamples: [
      {
        id: 'trig-ex-1',
        title: 'مثال: حل المعادلة التفاضلية y\'\' = 6x - 2 مع شروط ابتدائية',
        problemStatement: 'عين الدالة f التي تحقق المعادلة التفاضلية y\'\' = 6x - 2 مع الشرطين f(0) = 1 و f\'(0) = -3.',
        problemMath: 'y\'\' = 6x - 2',
        steps: [
          {
            stepNumber: 1,
            explanation: 'نبحث عن المشتقة الأولى f\'(x) كدالة أصلية لـ 6x - 2:',
            mathExpression: 'f\'(x) = 3x^2 - 2x + C_1'
          },
          {
            stepNumber: 2,
            explanation: 'باستخدام الشرط f\'(0) = -3 نجد C₁ = -3:',
            mathExpression: 'f\'(0) = C_1 = -3 \\implies f\'(x) = 3x^2 - 2x - 3'
          },
          {
            stepNumber: 3,
            explanation: 'نبحث عن f(x) كدالة أصلية لـ f\'(x):',
            mathExpression: 'f(x) = x^3 - x^2 - 3x + C_2'
          },
          {
            stepNumber: 4,
            explanation: 'باستخدام الشرط f(0) = 1 نجد C₂ = 1:',
            mathExpression: 'f(0) = C_2 = 1 \\implies f(x) = x^3 - x^2 - 3x + 1'
          }
        ],
        finalAnswer: 'الحل الوحيد هو الدالة:',
        finalAnswerMath: 'f(x) = x^3 - x^2 - 3x + 1',
        bacTip: 'تأكد دائماً من تعويض الشروط الابتدائية للتحقق من قيم الثوابت C₁ و C₂.'
      }
    ]
  },

  // 9. الدالة الأسية: تعريف وخواص
  'exponential-definition-props': {
    id: 'lesson-exp-props',
    conceptId: 'exponential-definition-props',
    title: 'الدالة الأسية النيبيرية: التعريف والخواص الجبرية الأساسية',
    videoUrl: 'https://www.youtube.com/watch?v=exp-definition',
    videoTitle: 'التعريف الدقيق للدالة الأسية e^x وخواصها الجبرية ونهاياتها الشهيرة',
    videoDuration: '15:20',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 60,
    objectives: [
      'فهم تعريف الدالة الأسية كحل للمعادلة التفاضلية y\' = y مع الشرط y(0) = 1.',
      'إتقان الخواص الجبرية: e^(a+b) = e^a · e^b و e^(-a) = 1/e^a و (e^a)^n = e^(na).',
      'حفظ موجبية الدالة الأسية: e^x > 0 تماماً لكل x ∈ ℝ.',
      'حفظ النهايات الشهيرة: lim_{x -> +∞} e^x = +∞ و lim_{x -> -∞} e^x = 0.'
    ],
    theory: {
      title: 'التعريف والمبرهنات الأساسية',
      summary: 'توجد دالة وحيدة f معرفة وقابلة للاشتقاق على ℝ تحقق f\' = f و f(0) = 1، تسمى الدالة الأسية النيبيرية ونرمز لها بالرمز exp أو e^x.',
      formulaTex: 'e^0 = 1 \\quad , \\quad (e^x)\' = e^x \\quad , \\quad e^x > 0 \\quad (\\forall x \\in \\mathbb{R})',
      formulaDescription: 'الدالة الأسية متزايدة تماماً وموجبة تماماً على ℝ وتنقل الجمع إلى جداء.',
      properties: [
        {
          label: 'خاصية الجداء',
          formulaTex: 'e^{a+b} = e^a \\cdot e^b',
          note: 'خاصية التحويل الأساسية للأسس'
        },
        {
          label: 'خاصية القسمة والأس السالب',
          formulaTex: '\\frac{e^a}{e^b} = e^{a-b} \\quad \\text{و} \\quad e^{-x} = \\frac{1}{e^x}',
          note: 'e^(-x) موجبة تماماً أيضاً'
        },
        {
          label: 'النهايات الأساسية لدالة e^x',
          formulaTex: '\\lim_{x \\to +\\infty} e^x = +\\infty \\quad , \\quad \\lim_{x \\to -\\infty} e^x = 0 \\quad , \\quad \\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1',
          note: 'نهاية العدد المشتق عند 0'
        }
      ],
      keyTheorem: {
        title: 'خاصية الرتابة والمقارنة',
        statement: 'بما أن الدالة الأسية متزايدة تماماً على ℝ فإن: e^a = e^b ⇔ a = b، و e^a < e^b ⇔ a < b.',
        mathTex: 'e^a = e^b \\iff a = b \\quad \\text{et} \\quad e^a < e^b \\iff a < b'
      }
    },
    workedExamples: [
      {
        id: 'exp-ex-1',
        title: 'مثال: تبسيط عبارات أسية معقدة',
        problemStatement: 'بسط العبارة A = (e^(2x) · e^(-x+1)) / (e^(x+2))²',
        problemMath: 'A = \\frac{e^{2x} \\cdot e^{-x+1}}{(e^{x+2})^2}',
        steps: [
          {
            stepNumber: 1,
            explanation: 'نجمع الأسس في البسط: 2x + (-x + 1) = x + 1:',
            mathExpression: '\\text{البسط} = e^{2x - x + 1} = e^{x+1}'
          },
          {
            stepNumber: 2,
            explanation: 'نضرب الأسس في المقام: 2(x + 2) = 2x + 4:',
            mathExpression: '\\text{المقام} = e^{2(x+2)} = e^{2x+4}'
          },
          {
            stepNumber: 3,
            explanation: 'نطرح أس المقام من أس البسط:',
            mathExpression: 'A = e^{(x+1) - (2x+4)} = e^{x + 1 - 2x - 4} = e^{-x-3} = \\frac{1}{e^{x+3}}'
          }
        ],
        finalAnswer: 'العبارة المبسطة هي:',
        finalAnswerMath: 'A = e^{-x-3} = \\frac{1}{e^{x+3}}',
        bacTip: 'التحكم في الخواص الجبرية يجنب الوقوع في أخطاء الحساب عند دراسة الدوال في البكالوريا.'
      }
    ]
  },

  // 10. معادلات ومتراجحات أسية
  'exponential-equations-inequalities': {
    id: 'lesson-exp-equations',
    conceptId: 'exponential-equations-inequalities',
    title: 'حل المعادلات والمتراجحات الأسية وتغيير المتغير',
    videoUrl: 'https://www.youtube.com/watch?v=exp-equations-bac',
    videoTitle: 'طرق حل المعادلات والمتراجحات من الشكل a·e^(2x) + b·e^x + c = 0 مع دراسة الإشارة',
    videoDuration: '18:00',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 60,
    objectives: [
      'حل المعادلات الأسية البسيطة: e^(u(x)) = e^(v(x)) ⇔ u(x) = v(x).',
      'استخدام تغيير المتغير X = e^x (مع الشرط الإجباري X > 0) لحل معادلات الدرجة الثانية.',
      'حل المتراجحات الأسية وتعيين مجالات الحلول بدقة.',
      'دراسة إشارة العبارات من الشكل (e^x - a)(e^x - b) في جداول الإشارة.'
    ],
    theory: {
      title: 'منهجية حل المعادلات والمتراجحات الأسية',
      summary: 'لحل معادلة من الشكل a e^(2x) + b e^x + c = 0 نضع X = e^x حيث X > 0 فتتحول إلى معادلة من الدرجة الثانية aX² + bX + c = 0. نرفض أي حل سالب أو معدوم لـ X لأن e^x موجب تماماً.',
      formulaTex: 'X = e^x \\quad (X > 0) \\implies aX^2 + bX + c = 0',
      formulaDescription: 'إذا كان X = k > 0 فإن x = ln(k). وإذا كان X ≤ 0 فليس للمعادلة حل بالنسبة لـ x.',
      properties: [
        {
          label: 'تكافؤ المتراجحات',
          formulaTex: 'e^{u(x)} \\le e^{v(x)} \\iff u(x) \\le v(x)',
          note: 'لأن الدالة الأسية متزايدة تماماً تحافظ على اتجاه المتراجحة.'
        },
        {
          label: 'إشارة e^x - a (حيث a > 0)',
          formulaTex: 'e^x - a > 0 \\iff e^x > a \\iff x > \\ln(a)',
          note: 'تنعدم عند ln(a) وتكون موجبة على ]ln(a), +∞[ وسالبة على ]-∞, ln(a)[.'
        }
      ],
      keyTheorem: {
        title: 'فخ شهير في البكالوريا (Piège BAC)',
        statement: 'إذا وجدت حلين لـ X هما X₁ = -3 و X₂ = 2، فالحل X₁ = -3 مرفوض لأن e^x لا يمكن أن يساوي سالباً. والحل المقبول الوحيد هو e^x = 2 أي x = ln(2).',
        mathTex: 'e^x = -3 \\quad (\\text{مستحيل}) \\quad , \\quad e^x = 2 \\iff x = \\ln(2)'
      }
    },
    workedExamples: [
      {
        id: 'exp-eq-ex-1',
        title: 'مثال: حل المعادلة e^(2x) - 3e^x + 2 = 0 في ℝ',
        problemStatement: 'حل في ℝ المعادلة: e^(2x) - 3e^x + 2 = 0 ثم استنتج حلول المتراجحة e^(2x) - 3e^x + 2 ≤ 0.',
        problemMath: 'e^{2x} - 3e^x + 2 = 0',
        steps: [
          {
            stepNumber: 1,
            explanation: 'نضع X = e^x مع X > 0 فتصبح المعادلة: X² - 3X + 2 = 0:',
            mathExpression: 'X^2 - 3X + 2 = 0 \\implies (X - 1)(X - 2) = 0'
          },
          {
            stepNumber: 2,
            explanation: 'إذن X = 1 أو X = 2 (كلاهما موجبان ومقبولان):',
            mathExpression: 'e^x = 1 \\implies x = 0 \\quad \\text{أو} \\quad e^x = 2 \\implies x = \\ln(2)'
          },
          {
            stepNumber: 3,
            explanation: 'لحل المتراجحة ≤ 0، ثلاثي الحدود يكون سالباً بين الجذرين 1 ≤ X ≤ 2:',
            mathExpression: '1 \\le e^x \\le 2 \\implies \\ln(1) \\le x \\le \\ln(2) \\implies 0 \\le x \\le \\ln(2)'
          }
        ],
        finalAnswer: 'مجموعة حلول المعادلة {0, ln(2)}، ومجموعة حلول المتراجحة هي المجال [0, ln(2)]:',
        finalAnswerMath: 'S = [0, \\ln(2)]',
        bacTip: 'دائماً تأكد من استخدام الأقواس المغلقة عند وجود إشارة التساوي ≤.'
      }
    ]
  },

  // 11. توظيف خواص دوال أسية x ↦ e^(kx)
  'exponential-kx-properties': {
    id: 'lesson-exp-kx',
    conceptId: 'exponential-kx-properties',
    title: 'توظيف خواص دوال أسية x ↦ e^(kx) وتطبيقاتها',
    videoUrl: 'https://www.youtube.com/watch?v=exp-kx',
    videoTitle: 'دراسة الدوال من الشكل e^(kx) ومعدلات النمو والتناقص الأسي والاشتقاق',
    videoDuration: '14:50',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 55,
    objectives: [
      'دراسة سلوك الدالة x ↦ e^(kx) حسب إشارة الثابت الحقيقي k (متزايدة إذا k > 0، متناقصة إذا k < 0).',
      'اشتقاق الدالة (e^(kx))\' = k e^(kx).',
      'حساب النهايات عند ±∞: إذا k > 0 فإن lim_{x -> +∞} e^(kx) = +∞، وإذا k < 0 فإن lim_{x -> +∞} e^(kx) = 0.',
      'تطبيق نموذج e^(kx) في الظواهر الفيزيائية (تفريغ مكثفة، النشاط الإشعاعي، وقانون التبريد).'
    ],
    theory: {
      title: 'دراسة الدالة x ↦ e^(kx)',
      summary: 'الدالة f(x) = e^(kx) معرفة وقابلة للاشتقاق على ℝ، ومشتقتها f\'(x) = k e^(kx). بما أن e^(kx) > 0 فإن إشارة المشتقة هي نفس إشارة k.',
      formulaTex: '(e^{kx})\' = k \\cdot e^{kx}',
      formulaDescription: 'إذا كان k > 0 فالدالة متزايدة تماماً (نمو أسي). وإذا كان k < 0 فالدالة متناقصة تماماً (اضمحلال أسي).',
      properties: [
        {
          label: 'حالة k > 0',
          formulaTex: '\\lim_{x \\to -\\infty} e^{kx} = 0 \\quad \\text{و} \\quad \\lim_{x \\to +\\infty} e^{kx} = +\\infty',
          note: 'يقبل مستقيم مقارب أفقي y = 0 بجوار -∞.'
        },
        {
          label: 'حالة k < 0 (مثل e^(-2x))',
          formulaTex: '\\lim_{x \\to -\\infty} e^{kx} = +\\infty \\quad \\text{و} \\quad \\lim_{x \\to +\\infty} e^{kx} = 0',
          note: 'يقبل مستقيم مقارب أفقي y = 0 بجوار +∞.'
        }
      ],
      keyTheorem: {
        title: 'التطبيق في البكالوريا',
        statement: 'كثيراً ما تعطى دوال من الشكل f(t) = A (1 - e^(-t/τ)) لتمثيل شحن مكثفة أو انتشار وباء، حيث f(0) = 0 و lim_{t -> +∞} f(t) = A.',
        mathTex: 'f(t) = A(1 - e^{-t/\\tau}) \\implies \\lim_{t \\to +\\infty} f(t) = A'
      }
    },
    workedExamples: [
      {
        id: 'kx-ex-1',
        title: 'مثال: دراسة اتجاه تغير ونهايات f(x) = 5 - 3e^(-2x)',
        problemStatement: 'ادرس اتجاه تغير الدالة f المعرفة على ℝ بـ f(x) = 5 - 3e^(-2x) واحسب نهاياتها عند ±∞.',
        problemMath: 'f(x) = 5 - 3e^{-2x}',
        steps: [
          {
            stepNumber: 1,
            explanation: 'نحسب المشتقة f\'(x):',
            mathExpression: 'f\'(x) = 0 - 3(-2 e^{-2x}) = 6 e^{-2x} > 0 \\quad (\\forall x \\in \\mathbb{R})'
          },
          {
            stepNumber: 2,
            explanation: 'بما أن f\'(x) > 0 فإن f متزايدة تماماً على ℝ:',
            mathExpression: 'f \\text{ متزايدة تماماً على } \\mathbb{R}'
          },
          {
            stepNumber: 3,
            explanation: 'حساب النهايات:',
            mathExpression: '\\lim_{x \\to +\\infty} e^{-2x} = 0 \\implies \\lim_{x \\to +\\infty} f(x) = 5 - 0 = 5'
          },
          {
            stepNumber: 4,
            explanation: 'النهاية عند -∞:',
            mathExpression: '\\lim_{x \\to -\\infty} e^{-2x} = +\\infty \\implies \\lim_{x \\to -\\infty} f(x) = 5 - 3(+\\infty) = -\\infty'
          }
        ],
        finalAnswer: 'يقبل المنحنى مستقيماً مقارباً أفقياً معادلته y = 5 بجوار +∞:',
        finalAnswerMath: 'y = 5 \\quad (\\text{مستقيم مقارب أفقي بجوار } +\\infty)',
        bacTip: 'عند حساب النهاية، تذكر أن e^(-2(-∞)) = e^(+∞) = +∞.'
      }
    ]
  },

  // 12. دراسة الدالة exp o u
  'exponential-composite-exp-u': {
    id: 'lesson-exp-u',
    conceptId: 'exponential-composite-exp-u',
    title: 'دراسة الدالة المركبة exp ∘ u : x ↦ e^(u(x))',
    videoUrl: 'https://www.youtube.com/watch?v=exp-composite',
    videoTitle: 'اشتقاق ونهايات مركب الدالة الأسية والتزايد المقارن في البكالوريا',
    videoDuration: '17:30',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 55,
    objectives: [
      'تطبيق قاعدة اشتقاق مركب الدالة الأسية: (e^(u(x)))\' = u\'(x) · e^(u(x)).',
      'فهم أن إشارة مشتقة e^(u(x)) هي تماماً نفس إشارة u\'(x) لأن e^u > 0 دوماً.',
      'حساب نهايات مركب دالة أسية باستخدام مبرهنة نهاية مركب دالتين.',
      'إتقان نهايات التزايد المقارن (Croissances Comparées): lim_{x -> +∞} e^x / x^n = +∞ و lim_{x -> -∞} x^n e^x = 0.'
    ],
    theory: {
      title: 'اشتقاق ونهايات e^(u(x)) والتزايد المقارن',
      summary: 'إذا كانت u دالة قابلة للاشتقاق على مجال I، فإن الدالة e^u قابلة للاشتقاق على I ومشتقتها (e^u)\' = u\' e^u. نهايات التزايد المقارن تظهر تغلب الدالة الأسية على قوى x عند اللانهاية.',
      formulaTex: '(e^{u(x)})\' = u\'(x) \\cdot e^{u(x)} \\quad \\text{و} \\quad \\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty \\quad (n \\in \\mathbb{N}^*)',
      formulaDescription: 'الدالة الأسية أسرع في النمو والتناقص من أي دالة كثيرة حدود عند اللانهاية.',
      properties: [
        {
          label: 'نهايات التزايد المقارن الشهيرة',
          formulaTex: '\\lim_{x \\to -\\infty} x e^x = 0 \\quad , \\quad \\lim_{x \\to -\\infty} x^n e^x = 0 \\quad , \\quad \\lim_{x \\to +\\infty} \\frac{e^x}{x} = +\\infty',
          note: 'تستعمل لإزالة حالات عدم التعيين 0 × ∞ و ∞ / ∞.'
        },
        {
          label: 'نهاية مركب دالتين',
          formulaTex: '\\lim_{x \\to x_0} u(x) = L \\implies \\lim_{x \\to x_0} e^{u(x)} = e^L',
          note: 'سواء كان L منتهياً أو ±∞'
        }
      ],
      keyTheorem: {
        title: 'استراتيجية إزالة عدم التعيين في الدوال الأسية',
        statement: 'في حالة ظهور عدم تعيين من الشكل +∞ - ∞ عند +∞، استخرج e^x عاملاً مشتركاً. وعند -∞ استخرج x عاملاً مشتركاً واستعمل lim x e^x = 0.',
        mathTex: 'e^x - x = e^x\\left(1 - \\frac{x}{e^x}\\right) \\xrightarrow[x \\to +\\infty]{} +\\infty(1 - 0) = +\\infty'
      }
    },
    workedExamples: [
      {
        id: 'exp-u-ex-1',
        title: 'مثال: اشتقاق وحساب نهايات f(x) = (x - 1) e^(2x)',
        problemStatement: 'احسب f\'(x) ونهايتي f(x) عند +∞ و -∞ للدالة f(x) = (x - 1) e^(2x).',
        problemMath: 'f(x) = (x - 1)e^{2x}',
        steps: [
          {
            stepNumber: 1,
            explanation: 'f عبارة عن جداء دالتين (u · v)\' = u\'v + uv\':',
            mathExpression: 'f\'(x) = 1 \\cdot e^{2x} + (x - 1)(2 e^{2x}) = e^{2x}(1 + 2x - 2) = (2x - 1)e^{2x}'
          },
          {
            stepNumber: 2,
            explanation: 'بما أن e^(2x) > 0، فإن إشارة f\'(x) من إشارة 2x - 1 (تنعدم عند x = 1/2):',
            mathExpression: 'f\'(x) > 0 \\iff x > \\frac{1}{2}'
          },
          {
            stepNumber: 3,
            explanation: 'النهاية عند +∞:',
            mathExpression: '\\lim_{x \\to +\\infty} (x - 1) = +\\infty \\quad \\text{و} \\quad \\lim_{x \\to +\\infty} e^{2x} = +\\infty \\implies \\lim_{x \\to +\\infty} f(x) = +\\infty'
          },
          {
            stepNumber: 4,
            explanation: 'النهاية عند -∞ ننشر: f(x) = x e^(2x) - e^(2x) = 0.5(2x e^(2x)) - e^(2x):',
            mathExpression: '\\lim_{x \\to -\\infty} 2x e^{2x} = 0 \\quad \\text{و} \\quad \\lim_{x \\to -\\infty} e^{2x} = 0 \\implies \\lim_{x \\to -\\infty} f(x) = 0'
          }
        ],
        finalAnswer: 'يقبل المنحنى مستقيماً مقارباً معادلته y = 0 بجوار -∞:',
        finalAnswerMath: '(C_f) \\text{ يقبل مقارب أفقي } y = 0 \\text{ عند } -\\infty',
        bacTip: 'نشر العبارة عند -∞ وتطبيق التزايد المقارن هو المفتاح الأساسي لنيل العلامة الكاملة.'
      }
    ]
  },

  // 13. الدوال اللوغاريتمية: تعريف وخواص
  'logarithm-definition-props': {
    id: 'lesson-log-props',
    conceptId: 'logarithm-definition-props',
    title: 'الدالة اللوغاريتمية النيبيرية: التعريف والخواص الجبرية',
    videoUrl: 'https://www.youtube.com/watch?v=log-definition',
    videoTitle: 'التعريف الدقيق للدالة اللوغاريتمية ln(x) وخواصها الجبرية ومجموعة التعريف',
    videoDuration: '16:10',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 55,
    objectives: [
      'فهم تعريف الدالة اللوغاريتمية النيبيرية ln(x) كدالة أصلية لـ 1/x على ]0, +∞[ تنعدم عند 1، والدالة العكسية لـ e^x.',
      'تحديد مجموعة تعريف العبارات اللوغاريتمية (ما بداخل اللوغاريتم موجب تماماً u(x) > 0).',
      'إتقان الخواص الجبرية: ln(ab) = ln a + ln b و ln(a/b) = ln a - ln b و ln(a^n) = n ln a.',
      'حفظ القيم والنهايات الأساسية: ln(1) = 0 و ln(e) = 1 و lim_{x -> 0^+} ln x = -∞ و lim_{x -> +∞} ln x = +∞.'
    ],
    theory: {
      title: 'التعريف والخواص الأساسية لدالة ln(x)',
      summary: 'الدالة اللوغاريتمية النيبيرية ln هي الدالة المعرفة على ]0, +∞[ والقابلة للاشتقاق بحيث (ln x)\' = 1/x و ln(1) = 0. وهي دالة متزايدة تماماً تحول الجداء إلى جمع.',
      formulaTex: '\\ln(1) = 0 \\quad , \\quad \\ln(e) = 1 \\quad , \\quad (\\ln x)\' = \\frac{1}{x} > 0 \\quad (\\forall x > 0)',
      formulaDescription: 'الدالة ln متزايدة تماماً على ]0, +∞[ وموجبة على [1, +∞[ وسالبة على ]0, 1].',
      properties: [
        {
          label: 'خاصية الجداء والقسمة',
          formulaTex: '\\ln(a \\cdot b) = \\ln a + \\ln b \\quad \\text{و} \\quad \\ln\\left(\\frac{a}{b}\\right) = \\ln a - \\ln b \\quad (a, b > 0)',
          note: 'خاصية التحويل اللوغاريتمي الشهيرة'
        },
        {
          label: 'خاصية القوة والجذر',
          formulaTex: '\\ln(a^n) = n \\ln a \\quad \\text{و} \\quad \\ln(\\sqrt{a}) = \\frac{1}{2}\\ln a',
          note: 'تساعد كثيراً في تبسيط الدوال قبل الاشتقاق'
        },
        {
          label: 'العلاقة التبادلية مع الدالة الأسية',
          formulaTex: '\\ln(e^x) = x \\quad (\\forall x \\in \\mathbb{R}) \\quad \\text{و} \\quad e^{\\ln x} = x \\quad (\\forall x > 0)',
          note: 'الدالتان متعاكستان ومنحناهما متناظران بالنسبة للمنصف الأول y = x.'
        }
      ],
      keyTheorem: {
        title: 'إشارة ln(x)',
        statement: 'العدد ln(x) سالب تماماً على ]0, 1[، ومعدوم عند 1، وموجب تماماً على ]1, +∞[.',
        mathTex: '\\begin{cases} \\ln x < 0 & (0 < x < 1) \\\\ \\ln x = 0 & (x = 1) \\\\ \\ln x > 0 & (x > 1) \\end{cases}'
      }
    },
    workedExamples: [
      {
        id: 'log-ex-1',
        title: 'مثال: تبسيط عبارات لوغاريتمية بدلالة ln 2 و ln 3',
        problemStatement: 'اكتب العبارة B = ln(72) - ln(18) + ln(√8) في شكل a ln 2 + b ln 3 حيث a و b عددان نسبيان.',
        problemMath: 'B = \\ln(72) - \\ln(18) + \\ln(\\sqrt{8})',
        steps: [
          {
            stepNumber: 1,
            explanation: 'نطبق خاصية القسمة: ln(72) - ln(18) = ln(72/18) = ln(4) = ln(2²) = 2 ln 2:',
            mathExpression: '\\ln(72) - \\ln(18) = \\ln\\left(\\frac{72}{18}\\right) = \\ln(4) = 2\\ln 2'
          },
          {
            stepNumber: 2,
            explanation: 'نبسط ln(√8) = (1/2) ln(8) = (1/2) ln(2³) = (3/2) ln 2:',
            mathExpression: '\\ln(\\sqrt{8}) = \\frac{1}{2}\\ln(2^3) = \\frac{3}{2}\\ln 2'
          },
          {
            stepNumber: 3,
            explanation: 'نجمع الحدود:',
            mathExpression: 'B = 2\\ln 2 + \\frac{3}{2}\\ln 2 = \\frac{7}{2}\\ln 2'
          }
        ],
        finalAnswer: 'العبارة المبسطة هي:',
        finalAnswerMath: 'B = \\frac{7}{2}\\ln 2',
        bacTip: 'تبسيط العبارات اللوغاريتمية قبل الحساب يختصر نصف خطوات الحل.'
      }
    ]
  },

  // 14. معادلات ومتراجحات لوغاريتمية
  'logarithm-equations-inequalities': {
    id: 'lesson-log-equations',
    conceptId: 'logarithm-equations-inequalities',
    title: 'حل المعادلات والمتراجحات اللوغاريتمية وتحديد مجموعة الصلاحية',
    videoUrl: 'https://www.youtube.com/watch?v=log-equations-bac',
    videoTitle: 'حل المعادلات والمتراجحات اللوغاريتمية وتغيير المتغير X = ln x في البكالوريا',
    videoDuration: '18:20',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 60,
    objectives: [
      'تحديد مجموعة صلاحية المعادلة/المتراجحة D_E قبل إجراء أي عملية تبسيط.',
      'حل المعادلات من الشكل ln(u(x)) = ln(v(x)) ⇔ u(x) = v(x) مع الشرطين u(x) > 0 و v(x) > 0.',
      'حل المعادلات اللوغاريتمية من الدرجة الثانية بتغيير المتغير X = ln x.',
      'حل المتراجحات اللوغاريتمية وتقاطع الحلول مع مجموعة الصلاحية D_E.'
    ],
    theory: {
      title: 'منهجية حل المعادلات اللوغاريتمية',
      summary: 'الخطوة الأولى الإلزامية هي تحديد مجموعة التعريف D_E (القيم التي تجعل كل ما بداخل كل لوغاريتم موجباً تماماً). ثم نحول المعادلة إلى شكل ln A = ln B ⇔ A = B. والحلول المقبولة هي فقط التي تنتمي إلى D_E.',
      formulaTex: '\\ln(u(x)) = \\ln(v(x)) \\iff \\begin{cases} u(x) = v(x) \\\\ u(x) > 0 \\quad \\text{و} \\quad v(x) > 0 \\end{cases}',
      formulaDescription: 'المتراجحة: ln(u(x)) < ln(v(x)) ⇔ u(x) < v(x) مع مراعاة شروط الوجود.',
      properties: [
        {
          label: 'تغيير المتغير X = ln x',
          formulaTex: 'a(\\ln x)^2 + b(\\ln x) + c = 0 \\implies aX^2 + bX + c = 0 \\quad (X \\in \\mathbb{R})',
          note: 'هنا X يمكن أن يكون موجباً أو سالباً أو معدوماً لأن مدى الدالة ln هو ℝ كامل.'
        },
        {
          label: 'إذا كان X = k فإن:',
          formulaTex: '\\ln x = k \\iff x = e^k',
          note: 'x = e^k دائماً موجب ومقبول.'
        }
      ],
      keyTheorem: {
        title: 'تحذير وزاري خطير جداً (Attention BAC)',
        statement: 'المعادلة ln(x - 1) + ln(x + 2) = 0 تختلف عن ln[(x - 1)(x + 2)] = 0 في مجموعة التعريف! في الأولى يجب x > 1 و x > -2 (أي D_E = ]1, +∞[)، بينما في الثانية (x-1)(x+2) > 0 يقبل مجالاً إضافياً ]-∞, -2[. في البكالوريا، حدد D_E من العبارة الأصلية المعطاة.',
        mathTex: 'D_E = \\{x \\in \\mathbb{R} \\mid u(x) > 0 \\text{ et } v(x) > 0\\}'
      }
    },
    workedExamples: [
      {
        id: 'log-eq-ex-1',
        title: 'مثال: حل المعادلة ln(2x - 1) + ln(x + 1) = ln(x + 5)',
        problemStatement: 'حل في ℝ المعادلة: ln(2x - 1) + ln(x + 1) = ln(x + 5).',
        problemMath: '\\ln(2x - 1) + \\ln(x + 1) = \\ln(x + 5)',
        steps: [
          {
            stepNumber: 1,
            explanation: 'نحدد مجموعة الصلاحية D_E: 2x - 1 > 0 (أي x > 1/2) و x + 1 > 0 (أي x > -1) و x + 5 > 0 (أي x > -5):',
            mathExpression: 'D_E = ]1/2, +\\infty['
          },
          {
            stepNumber: 2,
            explanation: 'نطبق خاصية الجمع: ln[(2x - 1)(x + 1)] = ln(x + 5):',
            mathExpression: '(2x - 1)(x + 1) = x + 5 \\implies 2x^2 + x - 1 = x + 5'
          },
          {
            stepNumber: 3,
            explanation: 'نبسط المعادلة: 2x² - 6 = 0:',
            mathExpression: '2x^2 = 6 \\implies x^2 = 3 \\implies x = \\sqrt{3} \\quad \\text{أو} \\quad x = -\\sqrt{3}'
          },
          {
            stepNumber: 4,
            explanation: 'نقارن الحلين مع D_E = ]1/2, +∞[: الحل -√3 مرفوض لأنه سالب، والحل √3 ≈ 1.732 مقبول.',
            mathExpression: '-\\sqrt{3} \\notin D_E \\quad \\text{و} \\quad \\sqrt{3} \\in D_E'
          }
        ],
        finalAnswer: 'المعادلة تقبل حلاً وحيداً هو √3:',
        finalAnswerMath: 'S = \\{\\sqrt{3}\\}',
        bacTip: 'عدم تحديد مجموعة التعريف D_E في البداية يكلفك نصف علامة السؤال في تصحيح البكالوريا.'
      }
    ]
  },

  // 15. دراسة الدالة ln o u واللوغاريتم العشري
  'logarithm-composite-and-decimal': {
    id: 'lesson-log-composite',
    conceptId: 'logarithm-composite-and-decimal',
    title: 'دراسة الدالة ln ∘ u ، وتعريف اللوغاريتم العشري (log)',
    videoUrl: 'https://www.youtube.com/watch?v=log-composite',
    videoTitle: 'اشتقاق ونهايات مركب الدالة اللوغاريتمية واللوغاريتم العشري log(x)',
    videoDuration: '17:15',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 60,
    objectives: [
      'اشتقاق الدالة اللوغاريتمية المركبة: (ln |u(x)|)\' = u\'(x) / u(x).',
      'تطبيق التزايد المقارن للوغاريتم: lim_{x -> +∞} (ln x)/x = 0 و lim_{x -> 0^+} x ln x = 0.',
      'تعريف اللوغاريتم العشري: log(x) = ln(x) / ln(10) وخواصه: log(10^n) = n و log(10) = 1.',
      'تطبيقات اللوغاريتم العشري في حساب pH، مقياس ريختر، وشدة الصوت بالديسبل.'
    ],
    theory: {
      title: 'مشتقات ln ∘ u ونهايات التزايد المقارن واللوغاريتم العشري',
      summary: 'الدالة ln(u(x)) معرفة وقابلة للاشتقاق على كل مجال تكون فيه u(x) موجبة تماماً وقابلة للاشتقاق، ومشتقتها (ln u)\' = u\' / u. اللوغاريتم العشري log(x) يسهل التعامل مع قوى العدد 10.',
      formulaTex: '(\\ln |u(x)|)\' = \\frac{u\'(x)}{u(x)} \\quad \\text{و} \\quad \\log(x) = \\frac{\\ln x}{\\ln 10}',
      formulaDescription: 'نهايات التزايد المقارن للوغاريتم توضح بطء نمو الدالة اللوغاريتمية مقارنة بأي قوة لـ x.',
      properties: [
        {
          label: 'نهايات التزايد المقارن لدالة ln',
          formulaTex: '\\lim_{x \\to +\\infty} \\frac{\\ln x}{x^n} = 0 \\quad , \\quad \\lim_{x \\to 0^+} x^n \\ln x = 0 \\quad (n \\in \\mathbb{N}^*)',
          note: 'تستعمل مباشرة لإزالة عدم التعيين ∞/∞ و 0×∞.'
        },
        {
          label: 'خواص اللوغاريتم العشري log(x)',
          formulaTex: '\\log(10) = 1 \\quad , \\quad \\log(10^k) = k \\quad (k \\in \\mathbb{Z}) \\quad , \\quad \\log(a \\cdot b) = \\log a + \\log b',
          note: 'تطبيقات الكيمياء: pH = -log[H₃O⁺]'
        }
      ],
      keyTheorem: {
        title: 'نصيحة لحساب مشتقة ln(u)',
        statement: 'لا تنس وضع u\'(x) في البسط و u(x) في المقام دون أي لوغاريتم في المشتقة! مثلاً مشتقة ln(x² + 1) هي 2x / (x² + 1).',
        mathTex: '(\\ln(x^2+1))\' = \\frac{2x}{x^2+1}'
      }
    },
    workedExamples: [
      {
        id: 'log-comp-ex-1',
        title: 'مثال: دراسة اتجاه تغير ونهايات f(x) = x - ln(x)',
        problemStatement: 'ادرس اتجاه تغير الدالة f المعرفة على ]0, +∞[ بـ f(x) = x - ln(x) واستنتج أن x > ln(x) لكل x > 0.',
        problemMath: 'f(x) = x - \\ln(x)',
        steps: [
          {
            stepNumber: 1,
            explanation: 'نحسب المشتقة f\'(x):',
            mathExpression: 'f\'(x) = 1 - \\frac{1}{x} = \\frac{x - 1}{x}'
          },
          {
            stepNumber: 2,
            explanation: 'بما أن x > 0، فإن إشارة f\'(x) من إشارة x - 1: تنعدم عند 1، سالبة على ]0, 1[ وموجبة على ]1, +∞[.',
            mathExpression: 'f\'(1) = 0 \\quad , \\quad f(1) = 1 - \\ln(1) = 1'
          },
          {
            stepNumber: 3,
            explanation: 'الدالة f تقبل قيمة حدية صغرى مطلقة هي f(1) = 1:',
            mathExpression: '\\forall x > 0 : f(x) \\ge f(1) = 1 > 0'
          },
          {
            stepNumber: 4,
            explanation: 'بما أن f(x) > 0 فإن x - ln(x) > 0 أي x > ln(x).',
            mathExpression: 'x - \\ln x > 0 \\implies x > \\ln x'
          }
        ],
        finalAnswer: 'الدالة متناقصة على ]0, 1] ومتزايدة على [1, +∞[، وقيمتها الحدية الصغرى 1:',
        finalAnswerMath: '\\forall x > 0 : x > \\ln x',
        bacTip: 'إثبات متراجحة شهيرة بواسطة دراسة تغيرات دالة فرق f(x) = u(x) - v(x) سؤال كلاسيكي في البكالوريا.'
      }
    ]
  },

  // 16. معادلات تفاضلية y' = ay + b
  'differential-equations-ay-b': {
    id: 'lesson-diff-eq-ay-b',
    conceptId: 'differential-equations-ay-b',
    title: 'حل المعادلات التفاضلية الخطية من الشكل: y\' = ay + b',
    videoUrl: 'https://www.youtube.com/watch?v=diff-equations-ay-b',
    videoTitle: 'حل المعادلات التفاضلية الخطية وتعيين الحل الخاص مع الشرط الابتدائي في البكالوريا',
    videoDuration: '15:50',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 60,
    objectives: [
      'معرفة الحل العام للمعادلة المتجانسة y\' = ay: y(x) = C e^(ax) حيث C ثابت حقيقي.',
      'تطبيق مبرهنة الحل العام للمعادلة غير المتجانسة y\' = ay + b (حيث a ≠ 0): y(x) = C e^(ax) - b/a.',
      'تعيين الحل الخاص الوحيد الذي يحقق شرطاً ابتدائياً معلوماً y(x₀) = y₀.',
      'حل المسائل الفيزيائية والتطبيقية المعبر عنها بمعادلة تفاضلية خطية.'
    ],
    theory: {
      title: 'مبرهنة حل المعادلات التفاضلية y\' = ay + b',
      summary: 'لتكن a و b عددين حقيقيين مع a ≠ 0. الحلول على ℝ للمعادلة التفاضلية y\' = ay + b هي الدوال f المعرفة بالعبارة f(x) = C e^(ax) - b/a حيث C ثابت حقيقي كيفية.',
      formulaTex: 'y\' = ay + b \\iff y(x) = C e^{ax} - \\frac{b}{a} \\quad (C \\in \\mathbb{R})',
      formulaDescription: '-b/a هو حل خاص ثابت (دالة ثابتة f₀(x) = -b/a) للمعادلة التفاضلية.',
      properties: [
        {
          label: 'حالة b = 0 (المعادلة المتجانسة y\' = ay)',
          formulaTex: 'y(x) = C e^{ax} \\quad (C \\in \\mathbb{R})',
          note: 'إذا كان a = 1 نحصل على y\' = y التي تعرف الدالة الأسية.'
        },
        {
          label: 'تعيين الثابت C بالشرط الابتدائي y(x₀) = y₀',
          formulaTex: 'y_0 = C e^{a x_0} - \\frac{b}{a} \\implies C = \\left(y_0 + \\frac{b}{a}\\right) e^{-a x_0}',
          note: 'يوجد حل وحيد يحقق الشرط الابتدائي.'
        }
      ],
      keyTheorem: {
        title: 'صيغة البرهان في البكالوريا',
        statement: 'نضع z = y + b/a ومنه z\' = y\'. المعادلة y\' = ay + b تكافئ z\' = a z، وحلها z(x) = C e^(ax)، ومنه y(x) = z(x) - b/a = C e^(ax) - b/a.',
        mathTex: 'y(x) = C e^{ax} - \\frac{b}{a}'
      }
    },
    workedExamples: [
      {
        id: 'diff-ay-ex-1',
        title: 'مثال: حل المعادلة 2y\' + 6y = 4 مع الشرط y(0) = 5',
        problemStatement: 'حل في ℝ المعادلة التفاضلية (E): 2y\' + 6y = 4، ثم عين الحل f لـ (E) الذي يحقق f(0) = 5.',
        problemMath: '2y\' + 6y = 4',
        steps: [
          {
            stepNumber: 1,
            explanation: 'نكتب المعادلة في الشكل النموذجي y\' = ay + b بقسمة الطرفين على 2:',
            mathExpression: '2y\' = -6y + 4 \\implies y\' = -3y + 2'
          },
          {
            stepNumber: 2,
            explanation: 'نحدد المعاملين a = -3 و b = 2 ونحسب -b/a = -2/(-3) = 2/3:',
            mathExpression: 'a = -3 \\quad , \\quad b = 2 \\implies -\\frac{b}{a} = \\frac{2}{3}'
          },
          {
            stepNumber: 3,
            explanation: 'الحل العام هو:',
            mathExpression: 'y(x) = C e^{-3x} + \\frac{2}{3} \\quad (C \\in \\mathbb{R})'
          },
          {
            stepNumber: 4,
            explanation: 'نعوض الشرط الابتدائي f(0) = 5:',
            mathExpression: 'f(0) = C e^0 + \\frac{2}{3} = 5 \\implies C + \\frac{2}{3} = 5 \\implies C = 5 - \\frac{2}{3} = \\frac{13}{3}'
          }
        ],
        finalAnswer: 'الحل الخاص المطلوب هو:',
        finalAnswerMath: 'f(x) = \\frac{13}{3} e^{-3x} + \\frac{2}{3}',
        bacTip: 'تأكد دائماً من كتابة المعادلة في الشكل y\' = ay + b قبل تعيين a و b لتفادي أخطاء الإشارة.'
      }
    ]
  },

  // 17. حساب النهايات والمستقيمات المقاربة الموازية للمحورين
  'limits-infinite-asymptotes': {
    id: 'lesson-limits-asymptotes',
    conceptId: 'limits-infinite-asymptotes',
    title: 'حساب النهايات عند الحدود والمستقيمات المقاربة الموازية للمحورين',
    videoUrl: 'https://www.youtube.com/watch?v=limits-asymptotes',
    videoTitle: 'حساب النهايات عند أطراف مجالات التعريف والتفسير الهندسي للمستقيمات المقاربة',
    videoDuration: '16:00',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 60,
    objectives: [
      'حساب النهايات عند أطراف مجالات التعريف المفتوحة (المنتهية وغير المنتهية).',
      'التفسير البياني للمقارب العمودي: lim_{x -> x₀} f(x) = ±∞ ⇔ المستقيم (Δ): x = x₀ مقارب عمودي.',
      'التفسير البياني للمقارب الأفقي: lim_{x -> ±∞} f(x) = L ⇔ المستقيم (D): y = L مقارب أفقي بجوار ±∞.',
      'التعامل مع النهايات بقيم كبرى (x > x₀) وبقيم صغرى (x < x₀).'
    ],
    theory: {
      title: 'المستقيمات المقاربة الموازية للمحورين',
      summary: 'المستقيم المقارب هو مستقيم يقترب منه منحنى الدالة كلما ابتعدت النقطة على المنحنى نحو اللانهاية. دراسة النهايات عند حدود مجموعة التعريف هي التي تعين هذه المستقيمات.',
      formulaTex: '\\lim_{x \\to x_0} f(x) = \\pm\\infty \\iff x = x_0 \\quad \\text{و} \\quad \\lim_{x \\to \\pm\\infty} f(x) = L \\iff y = L',
      formulaDescription: 'المستقيم x = x₀ يوازي محور التراتيب، والمستقيم y = L يوازي محور الفواصل.',
      properties: [
        {
          label: 'مستقيم مقارب عمودي',
          formulaTex: 'x = x_0 \\quad (\\text{موازي لـ } (y\'y))',
          note: 'يحدث عند القيم الممنوعة التي تعدم المقام ولا تعدم البسط.'
        },
        {
          label: 'مستقيم مقارب أفقي',
          formulaTex: 'y = L \\quad (\\text{موازي لـ } (x\'x))',
          note: 'يحدث عند حساب النهاية عند +∞ أو -∞ ونجد عدداً منتهياً L.'
        }
      ],
      keyTheorem: {
        title: 'منهجية الإجابة في البكالوريا',
        statement: 'اكتب التفسير الهندسي دائماً مصحوباً بالمعادلة: "بما أن lim_{x -> 2} f(x) = +∞ فإن المنحنى (C_f) يقبل مستقيماً مقارباً عمودياً معادلته x = 2".',
        mathTex: '\\lim_{x \\to a} f(x) = \\pm\\infty \\implies (\\Delta) : x = a \\text{ asymptote verticale}'
      }
    },
    workedExamples: [
      {
        id: 'lim-asymp-ex-1',
        title: 'مثال: حساب النهايات وتعيين المقاربات لـ f(x) = (2x + 1)/(x - 3)',
        problemStatement: 'عين مجموعة تعريف f(x) = (2x + 1)/(x - 3) واحسب نهاياتها عند أطراف مجالات التعريف وفسر النتائج هندسياً.',
        problemMath: 'f(x) = \\frac{2x + 1}{x - 3}',
        steps: [
          {
            stepNumber: 1,
            explanation: 'مجموعة التعريف هي D_f = ℝ \\ {3} = ]-∞, 3[ ∪ ]3, +∞[:',
            mathExpression: 'D_f = ]-\\infty, 3[ \\cup ]3, +\\infty['
          },
          {
            stepNumber: 2,
            explanation: 'النهايات عند ±∞ (أعلى درجة على أعلى درجة):',
            mathExpression: '\\lim_{x \\to \\pm\\infty} \\frac{2x+1}{x-3} = \\lim_{x \\to \\pm\\infty} \\frac{2x}{x} = 2'
          },
          {
            stepNumber: 3,
            explanation: 'التفسير: المستقيم ذو المعادلة y = 2 مقارب أفقي للمنحنى (C_f) بجوار +∞ و -∞.',
            mathExpression: 'y = 2 \\quad (\\text{مقارب أفقي})'
          },
          {
            stepNumber: 4,
            explanation: 'النهايات عند 3 بقيم صغرى وبقيم كبرى (البسط يؤول إلى 7 والمقام إلى 0):',
            mathExpression: '\\lim_{x \\to 3^<} f(x) = \\frac{7}{0^-} = -\\infty \\quad , \\quad \\lim_{x \\to 3^>} f(x) = \\frac{7}{0^+} = +\\infty'
          }
        ],
        finalAnswer: 'المستقيم x = 3 مقارب عمودي، والمستقيم y = 2 مقارب أفقي:',
        finalAnswerMath: 'x = 3 \\quad (\\text{عمودي}) \\quad \\text{و} \\quad y = 2 \\quad (\\text{أفقي})',
        bacTip: 'دراسة إشارة المقام في جدول إشارة صغير تساعدك على تجنب الخطأ بين 0⁺ و 0⁻.'
      }
    ]
  },

  // 18. مبرهنات العمليات على النهايات ونهاية مركب دالتين
  'limits-operations-composite': {
    id: 'lesson-limits-operations',
    conceptId: 'limits-operations-composite',
    title: 'مبرهنات العمليات على النهايات ونهاية مركب دالتين وإزالة عدم التعيين',
    videoUrl: 'https://www.youtube.com/watch?v=limits-operations',
    videoTitle: 'حالات عدم التعيين الأربع وطرق إزالتها (التحليل، المرافق، والعدد المشتق) في البكالوريا',
    videoDuration: '17:40',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 60,
    objectives: [
      'معرفة حالات عدم التعيين الأربع: (+∞ - ∞)، (0 × ∞)، (0 / 0)، و (∞ / ∞).',
      'إتقان تقنيات إزالة حالات عدم التعيين: التحليل والاختزال، استخراج العامل المشترك، الضرب في المرافق، والعدد المشتق.',
      'تطبيق مبرهنة نهاية مركب دالتين lim_{x -> x₀} g(f(x)) = L.',
      'التعامل مع نهايات كثيرات الحدود والدوال الناطقة عند اللانهاية بأخذ الحد الأعلى درجة.'
    ],
    theory: {
      title: 'حالات عدم التعيين ونهاية مركب دالتين',
      summary: 'العمليات على النهايات تتبع القواعد الجبرية المألوفة ما عدا الحالات الأربع لعدم التعيين التي تتطلب معالجة جبرية خاصة قبل حساب النهاية.',
      formulaTex: '\\text{FI} : \\left[+\\infty - \\infty\\right] \\quad , \\quad \\left[0 \\times \\infty\\right] \\quad , \\quad \\left[\\frac{0}{0}\\right] \\quad , \\quad \\left[\\frac{\\infty}{\\infty}\\right]',
      formulaDescription: 'مبرهنة نهاية المركب: إذا كان lim_{x -> a} f(x) = b وكان lim_{X -> b} g(X) = c فإن lim_{x -> a} g(f(x)) = c.',
      properties: [
        {
          label: 'طريقة المرافق (الدوال الجذرية)',
          formulaTex: '\\sqrt{A} - \\sqrt{B} = \\frac{A - B}{\\sqrt{A} + \\sqrt{B}}',
          note: 'تستخدم عند وجود جذور تربيعية وحالة عدم تعيين +∞ - ∞ أو 0/0.'
        },
        {
          label: 'طريقة العدد المشتق',
          formulaTex: '\\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0} = f\'(x_0)',
          note: 'تزيل حالة 0/0 في الدوال المثلثية والأسية واللوغاريتمية.'
        }
      ],
      keyTheorem: {
        title: 'قاعدة الحد الأعلى درجة',
        statement: 'عند +∞ أو -∞، نهاية دالة كثيرة حدود هي نهاية حدها ذي الدرجة الأعلى، ونهاية دالة ناطقة كسرية هي نهاية حاصل قسمة حديها ذوي الدرجة الأعلى.',
        mathTex: '\\lim_{x \\to \\pm\\infty} \\frac{a x^n + \\dots}{b x^m + \\dots} = \\lim_{x \\to \\pm\\infty} \\frac{a x^n}{b x^m}'
      }
    },
    workedExamples: [
      {
        id: 'lim-op-ex-1',
        title: 'مثال: حساب نهاية دالة جذرية بالمرافق lim (√(x² + 2x) - x) عند +∞',
        problemStatement: 'احسب النهاية: lim_{x -> +∞} (√(x² + 2x) - x).',
        problemMath: '\\lim_{x \\to +\\infty} \\left(\\sqrt{x^2 + 2x} - x\\right)',
        steps: [
          {
            stepNumber: 1,
            explanation: 'التعويض المباشر يعطي +∞ - ∞ (حالة عدم تعيين). نضرب ونقسم على المرافق √(x² + 2x) + x:',
            mathExpression: '\\frac{(\\sqrt{x^2 + 2x} - x)(\\sqrt{x^2 + 2x} + x)}{\\sqrt{x^2 + 2x} + x} = \\frac{(x^2 + 2x) - x^2}{\\sqrt{x^2 + 2x} + x} = \\frac{2x}{\\sqrt{x^2 + 2x} + x}'
          },
          {
            stepNumber: 2,
            explanation: 'نستخرج x عاملاً مشتركاً من المقام: √(x²(1 + 2/x)) = |x| √(1 + 2/x) = x √(1 + 2/x) لأن x > 0:',
            mathExpression: '\\frac{2x}{x\\left(\\sqrt{1 + \\frac{2}{x}} + 1\\right)} = \\frac{2}{\\sqrt{1 + \\frac{2}{x}} + 1}'
          },
          {
            stepNumber: 3,
            explanation: 'نحسب النهاية لما x يؤول إلى +∞ حيث 2/x يؤول إلى 0:',
            mathExpression: '\\lim_{x \\to +\\infty} \\frac{2}{\\sqrt{1 + 0} + 1} = \\frac{2}{1 + 1} = 1'
          }
        ],
        finalAnswer: 'النهاية بعد إزالة حالة عدم التعيين هي 1:',
        finalAnswerMath: '\\lim_{x \\to +\\infty} \\left(\\sqrt{x^2 + 2x} - x\\right) = 1',
        bacTip: 'انتبه لإشارة |x| عند استخراج x² من الجذر: إذا كان x -> -∞ فإن √(x²) = -x.'
      }
    ]
  },

  // 19. حساب النهايات باستعمال المقارنة أو الحصر (الساندويتش)
  'limits-comparison-squeeze': {
    id: 'lesson-limits-squeeze',
    conceptId: 'limits-comparison-squeeze',
    title: 'حساب النهايات باستعمال المقارنة أو الحصر (مبرهنة الساندويتش)',
    videoUrl: 'https://www.youtube.com/watch?v=limits-squeeze',
    videoTitle: 'مبرهنة الحصر والمقارنة ونهايات الدوال المثلثية المركبة في البكالوريا',
    videoDuration: '15:10',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 50,
    objectives: [
      'تطبيق مبرهنة الحصر (Théorème des Gendarmes): إذا كان g(x) ≤ f(x) ≤ h(x) وكانت lim g = lim h = L فإن lim f = L.',
      'تطبيق مبرهنات المقارنة للحصول على اللانهاية: إذا كان f(x) ≥ u(x) وكانت lim u = +∞ فإن lim f = +∞.',
      'حصر الدوال المثلثية المحدودة: -1 ≤ sin(u) ≤ 1 و -1 ≤ cos(u) ≤ 1.',
      'حساب نهايات الدوال من الشكل f(x) = (sin x)/x و f(x) = x sin(1/x) عند اللانهاية وعند 0.'
    ],
    theory: {
      title: 'مبرهنات المقارنة والحصر',
      summary: 'عندما لا يمكن حساب النهاية مباشرة بسبب الطبيعة الدورية للدوال مثل sin x و cos x التي لا تقبل نهاية عند اللانهاية، نلجأ إلى حصر العبارة بين دالتين معلومتي النهاية.',
      formulaTex: 'g(x) \\le f(x) \\le h(x) \\quad \\text{مع} \\quad \\lim_{x \\to x_0} g(x) = \\lim_{x \\to x_0} h(x) = L \\implies \\lim_{x \\to x_0} f(x) = L',
      formulaDescription: 'مبرهنة الحصر تسمى أيضاً مبرهنة الساندويتش أو مبرهنة الدركيين (Théorème des Gendarmes).',
      properties: [
        {
          label: 'مبرهنة المقارنة عند +∞',
          formulaTex: 'f(x) \\ge u(x) \\quad \\text{و} \\quad \\lim_{x \\to +\\infty} u(x) = +\\infty \\implies \\lim_{x \\to +\\infty} f(x) = +\\infty',
          note: 'إذا كبرت الدالة الصغرى إلى +∞ فإن الدالة الكبرى تؤول حتماً إلى +∞.'
        },
        {
          label: 'مبرهنة المقارنة عند -∞',
          formulaTex: 'f(x) \\le v(x) \\quad \\text{و} \\quad \\lim_{x \\to +\\infty} v(x) = -\\infty \\implies \\lim_{x \\to +\\infty} f(x) = -\\infty',
          note: 'إذا صغرت الدالة الكبرى إلى -∞ فإن الدالة الصغرى تؤول حتماً إلى -∞.'
        }
      ],
      keyTheorem: {
        title: 'الانطلاق دائماً من الحصر المثلثي الأساسي',
        statement: 'لحساب نهاية تحوي sin(v) أو cos(v) عند اللانهاية، انطلق دائماً من: -1 ≤ sin(v) ≤ 1 ثم اضرب أطراف المتراجحة مع الانتباه لإشارة المقدار المضروب.',
        mathTex: '-1 \\le \\cos(x) \\le 1 \\implies \\frac{-1}{x} \\le \\frac{\\cos x}{x} \\le \\frac{1}{x} \\quad (x > 0)'
      }
    },
    workedExamples: [
      {
        id: 'squeeze-ex-1',
        title: 'مثال: حساب نهاية f(x) = (2 + cos x)/(x + 1) عند +∞',
        problemStatement: 'احسب نهاية الدالة f(x) = (2 + cos x)/(x + 1) لما x يؤول إلى +∞ باستعمال مبرهنة الحصر.',
        problemMath: '\\lim_{x \\to +\\infty} \\frac{2 + \\cos x}{x + 1}',
        steps: [
          {
            stepNumber: 1,
            explanation: 'نعلم أنه لكل x ∈ ℝ لدينا: -1 ≤ cos x ≤ 1. نضيف 2 لجميع الأطراف:',
            mathExpression: '-1 + 2 \\le 2 + \\cos x \\le 1 + 2 \\implies 1 \\le 2 + \\cos x \\le 3'
          },
          {
            stepNumber: 2,
            explanation: 'عندما x > -1 يكون المقدار x + 1 > 0، نقسم على x + 1 دون تغيير اتجاه المتراجحة:',
            mathExpression: '\\frac{1}{x + 1} \\le \\frac{2 + \\cos x}{x + 1} \\le \\frac{3}{x + 1}'
          },
          {
            stepNumber: 3,
            explanation: 'نحسب نهايتي الطرفين لما x يؤول إلى +∞:',
            mathExpression: '\\lim_{x \\to +\\infty} \\frac{1}{x+1} = 0 \\quad \\text{و} \\quad \\lim_{x \\to +\\infty} \\frac{3}{x+1} = 0'
          },
          {
            stepNumber: 4,
            explanation: 'حسب مبرهنة الحصر، فإن نهاية f(x) عند +∞ تساوي 0:',
            mathExpression: '\\lim_{x \\to +\\infty} f(x) = 0'
          }
        ],
        finalAnswer: 'النهاية بالحصر تساوي 0:',
        finalAnswerMath: '\\lim_{x \\to +\\infty} \\frac{2 + \\cos x}{x + 1} = 0',
        bacTip: 'اذكر اسم مبرهنة الحصر صراحة واكتب حصر الطرفين ونهايتهما للحصول على العلامة كاملة.'
      }
    ]
  },

  // 20. دراسة السلوك التقاربي والمستقيم المقارب المائل
  'asymptotic-behavior-oblique': {
    id: 'lesson-oblique-asymptote',
    conceptId: 'asymptotic-behavior-oblique',
    title: 'دراسة السلوك التقاربي لدالة والمستقيم المقارب المائل والوضع النسبي',
    videoUrl: 'https://www.youtube.com/watch?v=oblique-asymptote',
    videoTitle: 'إثبات المستقيم المقارب المائل y = ax + b ودراسة الوضع النسبي في البكالوريا',
    videoDuration: '18:10',
    videoThumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    estimatedMinutes: 65,
    objectives: [
      'إثبات أن المستقيم (Δ): y = ax + b مقارب مائل لـ (C_f) بحساب lim_{x -> ±∞} [f(x) - (ax + b)] = 0.',
      'كتابة عبارة f(x) في الشكل النموذجي f(x) = ax + b + g(x) حيث lim g(x) = 0.',
      'دراسة الوضع النسبي للمنحنى (C_f) والمستقيم المقارب (Δ) بدراسة إشارة الفرق f(x) - (ax + b).',
      'تفسير نقطة التقاطع والوضع فوق/تحت هندسياً في الرسم البياني للبكالوريا.'
    ],
    theory: {
      title: 'المستقيم المقارب المائل ودراسة الوضع النسبي',
      summary: 'يكون المستقيم (Δ) ذو المعادلة y = ax + b (مع a ≠ 0) مستقيماً مقارباً مائلاً للمنحنى (C_f) بجوار +∞ (أو -∞) إذا وفقط إذا كانت المسافة العمودية بين المنحنى والمستقيم تؤول إلى الصفر عند اللانهاية.',
      formulaTex: '\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0 \\iff (\\Delta) : y = ax + b \\text{ asymptote oblique}',
      formulaDescription: 'لدراسة الوضع النسبي بين (C_f) و (Δ)، ندرس إشارة الفرق d(x) = f(x) - (ax + b) في جدول إشارة.',
      properties: [
        {
          label: 'الوضع فوق (Au-dessus)',
          formulaTex: 'f(x) - (ax + b) > 0 \\implies (C_f) \\text{ يقع فوق } (\\Delta)',
          note: 'المنحنى يعلو المستقيم'
        },
        {
          label: 'الوضع تحت (Au-dessous)',
          formulaTex: 'f(x) - (ax + b) < 0 \\implies (C_f) \\text{ يقع تحت } (\\Delta)',
          note: 'المنحنى أسفل المستقيم'
        },
        {
          label: 'نقطة التقاطع (Point d\'intersection)',
          formulaTex: 'f(x_0) - (ax_0 + b) = 0 \\implies (C_f) \\cap (\\Delta) = \\{A(x_0, ax_0 + b)\\}',
          note: 'المنحنى يقطع المستقيم عند النقطة A'
        }
      ],
      keyTheorem: {
        title: 'المنحنيات المقاربة (Courbes Asymptotes)',
        statement: 'إذا كان lim_{x -> ±∞} [f(x) - g(x)] = 0 حيث g(x) دالة من الدرجة الثانية (مثلاً قطع مكافئ g(x) = ax² + bx + c)، فإن (C_g) يسمى منحنى مقارباً لـ (C_f).',
        mathTex: '\\lim_{x \\to \\pm\\infty} [f(x) - g(x)] = 0'
      }
    },
    workedExamples: [
      {
        id: 'oblique-ex-1',
        title: 'مثال: إثبات مقارب مائل ودراسة الوضع النسبي لـ f(x) = 2x - 1 + 3/(x - 2)',
        problemStatement: 'لتكن f(x) = 2x - 1 + 3/(x - 2) المعرفة على ℝ \\ {2}. بين أن (Δ): y = 2x - 1 مقارب مائل لـ (C_f) بجوار ±∞، ثم ادرس الوضع النسبي لـ (C_f) بالنسبة إلى (Δ).',
        problemMath: 'f(x) = 2x - 1 + \\frac{3}{x - 2}',
        steps: [
          {
            stepNumber: 1,
            explanation: 'نحسب الفرق f(x) - y:',
            mathExpression: 'f(x) - (2x - 1) = \\frac{3}{x - 2}'
          },
          {
            stepNumber: 2,
            explanation: 'نحسب النهاية عند +∞ و -∞:',
            mathExpression: '\\lim_{x \\to \\pm\\infty} [f(x) - (2x - 1)] = \\lim_{x \\to \\pm\\infty} \\frac{3}{x - 2} = 0'
          },
          {
            stepNumber: 3,
            explanation: 'بما أن النهاية معدومة، فإن المستقيم (Δ): y = 2x - 1 مقارب مائل لـ (C_f) عند +∞ و -∞.',
            mathExpression: '(\\Delta) : y = 2x - 1 \\quad (\\text{مقارب مائل})'
          },
          {
            stepNumber: 4,
            explanation: 'ندرس إشارة الفرق 3/(x - 2): البسط 3 موجب دوماً، إذن الإشارة من إشارة x - 2:',
            mathExpression: 'x > 2 \\implies \\frac{3}{x-2} > 0 \\quad , \\quad x < 2 \\implies \\frac{3}{x-2} < 0'
          }
        ],
        finalAnswer: 'على ]2, +∞[ (C_f) فوق (Δ)، وعلى ]-∞, 2[ (C_f) تحت (Δ)، ولا يوجد تقاطع لأن 3/(x-2) لا تنعدم:',
        finalAnswerMath: '\\begin{cases} x \\in ]2, +\\infty[ & (C_f) \\text{ فوق } (\\Delta) \\\\ x \\in ]-\\infty, 2[ & (C_f) \\text{ تحت } (\\Delta) \\end{cases}',
        bacTip: 'رسم المستقيم المقارب المائل بنقطتين مساعدتين هو أول خطوة قبل رسم المنحنى في ورقة الإجابة.'
      }
    ]
  }
};
