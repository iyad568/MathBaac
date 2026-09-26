import { MiniTest } from '../types';

export const miniTests: Record<string, MiniTest> = {
  'chain-rule': {
    id: 'test-chain-rule-10',
    conceptId: 'chain-rule',
    title: 'اختبار قصير شامل: قاعدة السلسلة والاشتقاقية',
    timeLimitMinutes: 15,
    totalQuestions: 10,
    questions: [
      {
        id: 'tq-1',
        conceptId: 'chain-rule',
        chapterId: 'derivatives',
        conceptName: 'قوة دالة',
        questionNumber: 1,
        questionText: 'مشتقة الدالة f(x) = (4x - 1)^5 هي:',
        questionMath: 'f(x) = (4x - 1)^5',
        options: [
          { id: 'tq1_o1', text: '', mathTex: '5(4x - 1)^4' },
          { id: 'tq1_o2', text: '', mathTex: '20(4x - 1)^4' },
          { id: 'tq1_o3', text: '', mathTex: '4(4x - 1)^4' }
        ],
        correctOptionId: 'tq1_o2',
        explanation: '([u]^5)\' = 5 · u\' · u^4 = 5 · 4 · (4x - 1)^4 = 20(4x - 1)^4.'
      },
      {
        id: 'tq-2',
        conceptId: 'chain-rule',
        chapterId: 'derivatives',
        conceptName: 'مشتق الجذر',
        questionNumber: 2,
        questionText: 'مشتقة الدالة f(x) = √(5x + 1) على ]-1/5, +∞[ هي:',
        questionMath: 'f(x) = \\sqrt{5x + 1}',
        options: [
          { id: 'tq2_o1', text: '', mathTex: '\\frac{5}{2\\sqrt{5x + 1}}' },
          { id: 'tq2_o2', text: '', mathTex: '\\frac{1}{2\\sqrt{5x + 1}}' },
          { id: 'tq2_o3', text: '', mathTex: '\\frac{5}{\\sqrt{5x + 1}}' }
        ],
        correctOptionId: 'tq2_o1',
        explanation: '(√u)\' = u\' / (2√u) = 5 / (2√(5x+1)).'
      },
      {
        id: 'tq-3',
        conceptId: 'chain-rule',
        chapterId: 'derivatives',
        conceptName: 'مشتق الجذر التربيعي',
        questionNumber: 3,
        questionText: 'مشتقة الدالة f(x) = √(3x + 1) هي:',
        questionMath: 'f(x) = \\sqrt{3x + 1}',
        options: [
          { id: 'tq3_o1', text: '', mathTex: '\\frac{3}{2\\sqrt{3x + 1}}' },
          { id: 'tq3_o2', text: '', mathTex: '\\frac{1}{2\\sqrt{3x + 1}}' },
          { id: 'tq3_o3', text: '', mathTex: '\\frac{3}{\\sqrt{3x + 1}}' }
        ],
        correctOptionId: 'tq3_o1',
        explanation: '(√u)\' = u\' / (2√u) = 3 / (2√(3x+1)).'
      },
      {
        id: 'tq-4',
        conceptId: 'chain-rule',
        chapterId: 'derivatives',
        conceptName: 'قوة دالة كثيرة حدود',
        questionNumber: 4,
        questionText: 'مشتقة الدالة f(x) = (2x - 1)^3 هي:',
        questionMath: 'f(x) = (2x - 1)^3',
        options: [
          { id: 'tq4_o1', text: '', mathTex: '6(2x - 1)^2' },
          { id: 'tq4_o2', text: '', mathTex: '3(2x - 1)^2' },
          { id: 'tq4_o3', text: '', mathTex: '2(2x - 1)^2' }
        ],
        correctOptionId: 'tq4_o1',
        explanation: '(u^n)\' = n · u\' · u^(n-1) = 3(2)(2x-1)^2 = 6(2x-1)^2.'
      },
      {
        id: 'tq-5',
        conceptId: 'chain-rule',
        chapterId: 'derivatives',
        conceptName: 'دوال مثلثية',
        questionNumber: 5,
        questionText: 'مشتقة الدالة f(x) = cos(3x) هي:',
        questionMath: 'f(x) = \\cos(3x)',
        options: [
          { id: 'tq5_o1', text: '', mathTex: '3\\sin(3x)' },
          { id: 'tq5_o2', text: '', mathTex: '-3\\sin(3x)' },
          { id: 'tq5_o3', text: '', mathTex: '-\\sin(3x)' }
        ],
        correctOptionId: 'tq5_o2',
        explanation: '(cos(u))\' = -u\' · sin(u) = -3 sin(3x).'
      },
      {
        id: 'tq-6',
        conceptId: 'chain-rule',
        chapterId: 'derivatives',
        conceptName: 'حساب الميل',
        questionNumber: 6,
        questionText: 'ميل مماس المنحنى الممثل لـ f(x) = (x^2 + 1)^2 عند x = 1 هو:',
        questionMath: 'f\'(1) = ?',
        options: [
          { id: 'tq6_o1', text: '', mathTex: '4' },
          { id: 'tq6_o2', text: '', mathTex: '8' },
          { id: 'tq6_o3', text: '', mathTex: '16' }
        ],
        correctOptionId: 'tq6_o2',
        explanation: 'f\'(x) = 2(2x)(x^2+1) = 4x(x^2+1). عند x = 1: f\'(1) = 4(1)(2) = 8.'
      },
      {
        id: 'tq-7',
        conceptId: 'chain-rule',
        chapterId: 'derivatives',
        conceptName: 'قوة دالة',
        questionNumber: 7,
        questionText: 'مشتقة f(x) = 1 / (2x + 3)^2 هي:',
        questionMath: 'f(x) = (2x + 3)^{-2}',
        options: [
          { id: 'tq7_o1', text: '', mathTex: '\\frac{-4}{(2x + 3)^3}' },
          { id: 'tq7_o2', text: '', mathTex: '\\frac{-2}{(2x + 3)^3}' },
          { id: 'tq7_o3', text: '', mathTex: '\\frac{4}{(2x + 3)^3}' }
        ],
        correctOptionId: 'tq7_o1',
        explanation: '([u]^(-2))\' = -2 · u\' · u^(-3) = -2(2)(2x+3)^(-3) = -4 / (2x+3)^3.'
      },
      {
        id: 'tq-8',
        conceptId: 'chain-rule',
        chapterId: 'derivatives',
        conceptName: 'جداء دالة جذرية',
        questionNumber: 8,
        questionText: 'مشتقة الدالة f(x) = x√(x) على ]0, +∞[ هي:',
        questionMath: 'f(x) = x \\cdot \\sqrt{x}',
        options: [
          { id: 'tq8_o1', text: '', mathTex: '\\frac{3}{2}\\sqrt{x}' },
          { id: 'tq8_o2', text: '', mathTex: '\\frac{1}{2\\sqrt{x}}' },
          { id: 'tq8_o3', text: '', mathTex: '\\sqrt{x}' }
        ],
        correctOptionId: 'tq8_o1',
        explanation: '(u·v)\' = u\'v + uv\' = 1·√x + x·(1/(2√x)) = √x + √x/2 = (3/2)√x.'
      },
      {
        id: 'tq-9',
        conceptId: 'chain-rule',
        chapterId: 'derivatives',
        conceptName: 'مشتق الجذر',
        questionNumber: 9,
        questionText: 'مشتقة الدالة f(x) = √(x^2 + 9) عند x = 4 هي:',
        questionMath: 'f\'(4) = ?',
        options: [
          { id: 'tq9_o1', text: '', mathTex: '4/5' },
          { id: 'tq9_o2', text: '', mathTex: '8/5' },
          { id: 'tq9_o3', text: '', mathTex: '1/5' }
        ],
        correctOptionId: 'tq9_o1',
        explanation: 'f\'(x) = 2x / (2√(x^2+9)) = x / √(x^2+9). عند x = 4: 4 / √(16+9) = 4 / √25 = 4/5.'
      },
      {
        id: 'tq-10',
        conceptId: 'chain-rule',
        chapterId: 'derivatives',
        conceptName: 'المشتقات المتتابعة لكثير حدود',
        questionNumber: 10,
        questionText: 'المشتق الثاني f\'\'(x) للدالة f(x) = x^4 - 2x^3 + 5x هو:',
        questionMath: 'f\'\'(x) = ?',
        options: [
          { id: 'tq10_o1', text: '', mathTex: '12x^2 - 12x' },
          { id: 'tq10_o2', text: '', mathTex: '4x^3 - 6x^2 + 5' },
          { id: 'tq10_o3', text: '', mathTex: '12x^2 - 6x' }
        ],
        correctOptionId: 'tq10_o1',
        explanation: 'f\'(x) = 4x^3 - 6x^2 + 5 ثم f\'\'(x) = 12x^2 - 12x.'
      }
    ]
  },

  'diagnostic-assessment': {
    id: 'test-diagnostic-assessment-5',
    conceptId: 'diagnostic-assessment',
    title: 'اختبار قصير: تذكير بمكتسبات الاشتقاق الأساسية',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-diag-1', conceptId: 'diagnostic-assessment', chapterId: 'diagnostic', conceptName: 'اشتقاق كثير حدود',
        questionNumber: 1, questionText: 'مشتقة الدالة f(x) = x^2 - 4x + 3 هي:', questionMath: 'f(x) = x^2 - 4x + 3',
        options: [
          { id: 'tq_diag1_o1', text: '', mathTex: '2x - 4' },
          { id: 'tq_diag1_o2', text: '', mathTex: '2x + 4' },
          { id: 'tq_diag1_o3', text: '', mathTex: 'x - 4' }
        ],
        correctOptionId: 'tq_diag1_o1',
        explanation: 'نشتق حداً حداً: مشتق x^2 هو 2x، مشتق -4x هو -4، ومشتق الثابت 3 هو 0.'
      },
      {
        id: 'tq-diag-2', conceptId: 'diagnostic-assessment', chapterId: 'diagnostic', conceptName: 'اشتقاق دالة قوة',
        questionNumber: 2, questionText: 'مشتقة الدالة f(x) = 2x^3 هي:', questionMath: 'f(x) = 2x^3',
        options: [
          { id: 'tq_diag2_o1', text: '', mathTex: '6x^2' },
          { id: 'tq_diag2_o2', text: '', mathTex: '2x^2' },
          { id: 'tq_diag2_o3', text: '', mathTex: '6x^3' }
        ],
        correctOptionId: 'tq_diag2_o1',
        explanation: 'نطبق قاعدة (x^n)\' = n x^(n-1) مضروبة في المعامل 2: 2 × 3x^2 = 6x^2.'
      },
      {
        id: 'tq-diag-3', conceptId: 'diagnostic-assessment', chapterId: 'diagnostic', conceptName: 'اشتقاق دالة ثابتة',
        questionNumber: 3, questionText: 'مشتقة الدالة الثابتة f(x) = 5 هي:', questionMath: 'f(x) = 5',
        options: [
          { id: 'tq_diag3_o1', text: '', mathTex: '0' },
          { id: 'tq_diag3_o2', text: '', mathTex: '5' },
          { id: 'tq_diag3_o3', text: '', mathTex: '1' }
        ],
        correctOptionId: 'tq_diag3_o1',
        explanation: 'مشتقة أي دالة ثابتة تساوي صفراً دائماً.'
      },
      {
        id: 'tq-diag-4', conceptId: 'diagnostic-assessment', chapterId: 'diagnostic', conceptName: 'اشتقاق دالة خطية',
        questionNumber: 4, questionText: 'مشتقة الدالة f(x) = 3x هي:', questionMath: 'f(x) = 3x',
        options: [
          { id: 'tq_diag4_o1', text: '', mathTex: '3' },
          { id: 'tq_diag4_o2', text: '', mathTex: '3x' },
          { id: 'tq_diag4_o3', text: '', mathTex: '0' }
        ],
        correctOptionId: 'tq_diag4_o1',
        explanation: 'مشتقة الدالة الخطية ax هي المعامل a نفسه، أي 3.'
      },
      {
        id: 'tq-diag-5', conceptId: 'diagnostic-assessment', chapterId: 'diagnostic', conceptName: 'ميل المماس',
        questionNumber: 5, questionText: 'ميل المماس لمنحنى الدالة f(x) = x^2 عند النقطة ذات الفاصلة x = 1 يساوي:', questionMath: "f'(1) = ?",
        options: [
          { id: 'tq_diag5_o1', text: '', mathTex: '2' },
          { id: 'tq_diag5_o2', text: '', mathTex: '1' },
          { id: 'tq_diag5_o3', text: '', mathTex: '0' }
        ],
        correctOptionId: 'tq_diag5_o1',
        explanation: 'f\'(x) = 2x، إذن f\'(1) = 2، وهذا هو ميل المماس عند تلك النقطة.'
      }
    ]
  },

  'continuity-derivatives-basics': {
    id: 'test-continuity-derivatives-basics-5',
    conceptId: 'continuity-derivatives-basics',
    title: 'اختبار قصير: الاشتقاقية والاستمرارية',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-cdb-1', conceptId: 'continuity-derivatives-basics', chapterId: 'derivatives', conceptName: 'اشتقاق كثير حدود',
        questionNumber: 1, questionText: 'مشتقة الدالة f(x) = x^2 - 2x + 3 هي:', questionMath: 'f(x) = x^2 - 2x + 3',
        options: [
          { id: 'tq_cdb1_o1', text: '', mathTex: '2x - 2' },
          { id: 'tq_cdb1_o2', text: '', mathTex: '2x - 3' },
          { id: 'tq_cdb1_o3', text: '', mathTex: 'x - 2' }
        ],
        correctOptionId: 'tq_cdb1_o1',
        explanation: 'نشتق كل حد من حدود الدالة كثيرة الحدود.'
      },
      {
        id: 'tq-cdb-2', conceptId: 'continuity-derivatives-basics', chapterId: 'derivatives', conceptName: 'المعنى الهندسي للعدد المشتق',
        questionNumber: 2, questionText: 'العدد المشتق f\'(a) يمثل هندسياً:',
        options: [
          { id: 'tq_cdb2_o1', text: 'ميل المماس لمنحنى الدالة عند النقطة ذات الفاصلة a' },
          { id: 'tq_cdb2_o2', text: 'قيمة الدالة عند النقطة ذات الفاصلة a' },
          { id: 'tq_cdb2_o3', text: 'نقطة تقاطع المنحنى مع محور الفواصل' }
        ],
        correctOptionId: 'tq_cdb2_o1',
        explanation: 'العدد المشتق عند نقطة يساوي معامل توجيه (ميل) المماس للمنحنى عند تلك النقطة.'
      },
      {
        id: 'tq-cdb-3', conceptId: 'continuity-derivatives-basics', chapterId: 'derivatives', conceptName: 'حساب العدد المشتق',
        questionNumber: 3, questionText: 'لتكن f(x) = x^2. قيمة العدد المشتق f\'(2) هي:', questionMath: "f'(2) = ?",
        options: [
          { id: 'tq_cdb3_o1', text: '', mathTex: '4' },
          { id: 'tq_cdb3_o2', text: '', mathTex: '2' },
          { id: 'tq_cdb3_o3', text: '', mathTex: '8' }
        ],
        correctOptionId: 'tq_cdb3_o1',
        explanation: 'f\'(x) = 2x، إذن f\'(2) = 4.'
      },
      {
        id: 'tq-cdb-4', conceptId: 'continuity-derivatives-basics', chapterId: 'derivatives', conceptName: 'شرط قابلية الاشتقاق',
        questionNumber: 4, questionText: 'لكي تكون دالة قابلة للاشتقاق عند نقطة، يجب أولاً أن تكون:',
        options: [
          { id: 'tq_cdb4_o1', text: 'متصلة عند تلك النقطة' },
          { id: 'tq_cdb4_o2', text: 'كثيرة حدود من الدرجة الثانية على الأقل' },
          { id: 'tq_cdb4_o3', text: 'موجبة عند تلك النقطة' }
        ],
        correctOptionId: 'tq_cdb4_o1',
        explanation: 'الاتصال عند نقطة شرط ضروري (لكن غير كاف) لقابلية الاشتقاق عندها.'
      },
      {
        id: 'tq-cdb-5', conceptId: 'continuity-derivatives-basics', chapterId: 'derivatives', conceptName: 'اشتقاق دالة تآلفية',
        questionNumber: 5, questionText: 'مشتقة الدالة f(x) = -3x + 7 هي:', questionMath: 'f(x) = -3x + 7',
        options: [
          { id: 'tq_cdb5_o1', text: '', mathTex: '-3' },
          { id: 'tq_cdb5_o2', text: '', mathTex: '3' },
          { id: 'tq_cdb5_o3', text: '', mathTex: '7' }
        ],
        correctOptionId: 'tq_cdb5_o1',
        explanation: 'مشتقة الدالة التآلفية ax + b هي المعامل a، أي -3 هنا.'
      }
    ]
  },

  'mean-value-theorem': {
    id: 'test-mean-value-theorem-5',
    conceptId: 'mean-value-theorem',
    title: 'اختبار قصير: مبرهنة القيم المتوسطة',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-mvt-1', conceptId: 'mean-value-theorem', chapterId: 'derivatives', conceptName: 'شروط المبرهنة',
        questionNumber: 1, questionText: 'من الشروط الأساسية لتطبيق مبرهنة القيم المتوسطة على مجال [a,b] أن تكون الدالة:',
        options: [
          { id: 'tq_mvt1_o1', text: 'متصلة على المجال [a,b]' },
          { id: 'tq_mvt1_o2', text: 'متزايدة تماما فقط' },
          { id: 'tq_mvt1_o3', text: 'كثيرة حدود فقط' }
        ],
        correctOptionId: 'tq_mvt1_o1',
        explanation: 'الاتصال على المجال المغلق شرط أساسي لتطبيق المبرهنة، بالإضافة إلى الرتابة الصارمة.'
      },
      {
        id: 'tq-mvt-2', conceptId: 'mean-value-theorem', chapterId: 'derivatives', conceptName: 'عدد الحلول',
        questionNumber: 2, questionText: 'لتكن f(x) = x^3 + x - 1 على [0,1]، علماً أن f(0) = -1 و f(1) = 1. عدد حلول المعادلة f(x) = 0 في ]0,1[ هو:',
        options: [
          { id: 'tq_mvt2_o1', text: '', mathTex: '1' },
          { id: 'tq_mvt2_o2', text: '', mathTex: '0' },
          { id: 'tq_mvt2_o3', text: '', mathTex: '2' }
        ],
        correctOptionId: 'tq_mvt2_o1',
        explanation: 'f متصلة ورتيبة تماما (f\' = 3x^2+1 > 0) وتغير إشارتها بين 0 و1، إذن حل وحيد.'
      },
      {
        id: 'tq-mvt-3', conceptId: 'mean-value-theorem', chapterId: 'derivatives', conceptName: 'نتيجة المبرهنة',
        questionNumber: 3, questionText: 'إذا كانت f متصلة ورتيبة تماما على [a,b] وكان f(a) × f(b) < 0، فإن عدد حلول المعادلة f(x) = 0 في ]a,b[ هو:',
        options: [
          { id: 'tq_mvt3_o1', text: '', mathTex: '1' },
          { id: 'tq_mvt3_o2', text: '', mathTex: '0' },
          { id: 'tq_mvt3_o3', text: 'عدد غير منته' }
        ],
        correctOptionId: 'tq_mvt3_o1',
        explanation: 'تغير الإشارة مع الرتابة الصارمة والاتصال يضمن وجود حل وحيد بالضبط.'
      },
      {
        id: 'tq-mvt-4', conceptId: 'mean-value-theorem', chapterId: 'derivatives', conceptName: 'دراسة إشارة المشتقة',
        questionNumber: 4, questionText: 'لتكن g(x) = x^3 + 2x - 5. إشارة g\'(x) = 3x^2 + 2 على ℝ هي:',
        options: [
          { id: 'tq_mvt4_o1', text: 'موجبة قطعاً على ℝ' },
          { id: 'tq_mvt4_o2', text: 'سالبة قطعاً على ℝ' },
          { id: 'tq_mvt4_o3', text: 'تتغير حسب إشارة x' }
        ],
        correctOptionId: 'tq_mvt4_o1',
        explanation: '3x^2 موجبة أو معدومة دائماً، فإضافة 2 تجعل المجموع موجباً قطعاً دائماً.'
      },
      {
        id: 'tq-mvt-5', conceptId: 'mean-value-theorem', chapterId: 'derivatives', conceptName: 'استنتاج عدد الحلول على ℝ',
        questionNumber: 5, questionText: 'بما أن g(x) = x^3 + 2x - 5 متزايدة تماما على ℝ وأن g(1) = -2 و g(2) = 7، فإن عدد حلول g(x) = 0 على ℝ هو:',
        options: [
          { id: 'tq_mvt5_o1', text: '', mathTex: '1' },
          { id: 'tq_mvt5_o2', text: '', mathTex: '2' },
          { id: 'tq_mvt5_o3', text: '', mathTex: '0' }
        ],
        correctOptionId: 'tq_mvt5_o1',
        explanation: 'الرتابة الصارمة على كامل ℝ تمنع وجود أكثر من حل واحد، والمبرهنة تؤكد وجوده في ]1,2[.'
      }
    ]
  },

  'function-properties-tangents': {
    id: 'test-function-properties-tangents-5',
    conceptId: 'function-properties-tangents',
    title: 'اختبار قصير: خواص دالة والمنحنى الممثل لها (1)',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-fpt-1', conceptId: 'function-properties-tangents', chapterId: 'derivatives', conceptName: 'اشتقاق كثير حدود',
        questionNumber: 1, questionText: 'مشتقة الدالة f(x) = x^3 - 3x هي:', questionMath: 'f(x) = x^3 - 3x',
        options: [
          { id: 'tq_fpt1_o1', text: '', mathTex: '3x^2 - 3' },
          { id: 'tq_fpt1_o2', text: '', mathTex: '3x^2 - 3x' },
          { id: 'tq_fpt1_o3', text: '', mathTex: 'x^2 - 3' }
        ],
        correctOptionId: 'tq_fpt1_o1',
        explanation: 'نشتق كل حد: مشتق x^3 هو 3x^2، ومشتق -3x هو -3.'
      },
      {
        id: 'tq-fpt-2', conceptId: 'function-properties-tangents', chapterId: 'derivatives', conceptName: 'المماس الأفقي',
        questionNumber: 2, questionText: 'القيم التي يكون عندها المماس أفقياً لنفس الدالة هي:',
        options: [
          { id: 'tq_fpt2_o1', text: 'x = 1 و x = -1' },
          { id: 'tq_fpt2_o2', text: 'x = 0 فقط' },
          { id: 'tq_fpt2_o3', text: 'x = 3 فقط' }
        ],
        correctOptionId: 'tq_fpt2_o1',
        explanation: 'f\'(x) = 3(x-1)(x+1) = 0 عند x = 1 أو x = -1.'
      },
      {
        id: 'tq-fpt-3', conceptId: 'function-properties-tangents', chapterId: 'derivatives', conceptName: 'القيم الحدية',
        questionNumber: 3, questionText: 'القيمة f(-1) = 2 لنفس الدالة تمثل:',
        options: [
          { id: 'tq_fpt3_o1', text: 'قيمة عظمى محلية' },
          { id: 'tq_fpt3_o2', text: 'قيمة صغرى محلية' },
          { id: 'tq_fpt3_o3', text: 'نقطة انعطاف' }
        ],
        correctOptionId: 'tq_fpt3_o1',
        explanation: 'f\' تتغير من الموجب إلى السالب عند x = -1، إذن f تقبل قيمة عظمى محلية هناك.'
      },
      {
        id: 'tq-fpt-4', conceptId: 'function-properties-tangents', chapterId: 'derivatives', conceptName: 'إشارة المشتقة والرتابة',
        questionNumber: 4, questionText: 'إذا كانت f\'(x) > 0 على مجال ما، فإن الدالة f تكون على هذا المجال:',
        options: [
          { id: 'tq_fpt4_o1', text: 'متزايدة تماما' },
          { id: 'tq_fpt4_o2', text: 'متناقصة تماما' },
          { id: 'tq_fpt4_o3', text: 'ثابتة' }
        ],
        correctOptionId: 'tq_fpt4_o1',
        explanation: 'إشارة المشتقة الموجبة تعني أن الدالة متزايدة تماما على ذلك المجال.'
      },
      {
        id: 'tq-fpt-5', conceptId: 'function-properties-tangents', chapterId: 'derivatives', conceptName: 'معامل توجيه المماس',
        questionNumber: 5, questionText: 'معامل توجيه المماس لمنحنى دالة عند نقطة يساوي:',
        options: [
          { id: 'tq_fpt5_o1', text: 'العدد المشتق للدالة عند تلك النقطة' },
          { id: 'tq_fpt5_o2', text: 'قيمة الدالة عند تلك النقطة' },
          { id: 'tq_fpt5_o3', text: 'صفر دائماً' }
        ],
        correctOptionId: 'tq_fpt5_o1',
        explanation: 'معامل توجيه المماس عند نقطة يساوي بالتعريف العدد المشتق عند تلك النقطة.'
      }
    ]
  },

  'function-variation-inflection': {
    id: 'test-function-variation-inflection-5',
    conceptId: 'function-variation-inflection',
    title: 'اختبار قصير: خواص دالة والمنحنى الممثل لها (2)',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-fvi-1', conceptId: 'function-variation-inflection', chapterId: 'derivatives', conceptName: 'تعريف نقطة الانعطاف',
        questionNumber: 1, questionText: 'نقطة الانعطاف لمنحنى دالة هي النقطة التي:',
        options: [
          { id: 'tq_fvi1_o1', text: 'تتغير عندها إشارة المشتقة الثانية' },
          { id: 'tq_fvi1_o2', text: 'تنعدم عندها المشتقة الأولى فقط' },
          { id: 'tq_fvi1_o3', text: 'تكون الدالة غير متصلة عندها' }
        ],
        correctOptionId: 'tq_fvi1_o1',
        explanation: 'نقطة الانعطاف هي النقطة التي يتغير عندها تقعر المنحنى، أي تتغير عندها إشارة المشتقة الثانية.'
      },
      {
        id: 'tq-fvi-2', conceptId: 'function-variation-inflection', chapterId: 'derivatives', conceptName: 'حساب المشتقة الثانية',
        questionNumber: 2, questionText: 'المشتقة الثانية للدالة f(x) = x^3 - 3x^2 + 2 هي:', questionMath: "f''(x) = ?",
        options: [
          { id: 'tq_fvi2_o1', text: '', mathTex: '6x - 6' },
          { id: 'tq_fvi2_o2', text: '', mathTex: '3x^2 - 6x' },
          { id: 'tq_fvi2_o3', text: '', mathTex: '6x' }
        ],
        correctOptionId: 'tq_fvi2_o1',
        explanation: 'f\'(x) = 3x^2 - 6x، ثم f\'\'(x) = 6x - 6.'
      },
      {
        id: 'tq-fvi-3', conceptId: 'function-variation-inflection', chapterId: 'derivatives', conceptName: 'فاصلة نقطة الانعطاف',
        questionNumber: 3, questionText: 'فاصلة نقطة انعطاف نفس الدالة f(x) = x^3 - 3x^2 + 2 هي:',
        options: [
          { id: 'tq_fvi3_o1', text: '', mathTex: '1' },
          { id: 'tq_fvi3_o2', text: '', mathTex: '0' },
          { id: 'tq_fvi3_o3', text: '', mathTex: '2' }
        ],
        correctOptionId: 'tq_fvi3_o1',
        explanation: 'f\'\'(x) = 6x - 6 تنعدم وتغير إشارتها عند x = 1.'
      },
      {
        id: 'tq-fvi-4', conceptId: 'function-variation-inflection', chapterId: 'derivatives', conceptName: 'عدد نقاط الانعطاف',
        questionNumber: 4, questionText: 'لتكن g(x) = x^4 - 6x^2 + 1. عدد نقاط انعطاف منحناها على ℝ هو:',
        options: [
          { id: 'tq_fvi4_o1', text: '', mathTex: '2' },
          { id: 'tq_fvi4_o2', text: '', mathTex: '1' },
          { id: 'tq_fvi4_o3', text: '', mathTex: '0' }
        ],
        correctOptionId: 'tq_fvi4_o1',
        explanation: 'g\'\'(x) = 12x^2 - 12 = 12(x-1)(x+1) تتغير إشارتها عند x = 1 و x = -1، إذن نقطتا انعطاف.'
      },
      {
        id: 'tq-fvi-5', conceptId: 'function-variation-inflection', chapterId: 'derivatives', conceptName: 'خاصية عامة',
        questionNumber: 5, questionText: 'عدد نقاط الانعطاف الممكنة لمنحنى دالة كثيرة حدود من الدرجة الثالثة هو على الأكثر:',
        options: [
          { id: 'tq_fvi5_o1', text: '', mathTex: '1' },
          { id: 'tq_fvi5_o2', text: '', mathTex: '2' },
          { id: 'tq_fvi5_o3', text: '', mathTex: '3' }
        ],
        correctOptionId: 'tq_fvi5_o1',
        explanation: 'المشتقة الثانية لكثير حدود من الدرجة الثالثة هي دالة تآلفية (من الدرجة الأولى)، فلا يمكن أن تنعدم وتغير إشارتها إلا مرة واحدة على الأكثر.'
      }
    ]
  },

  'problem-solving-derivatives': {
    id: 'test-problem-solving-derivatives-5',
    conceptId: 'problem-solving-derivatives',
    title: 'اختبار قصير: توظيف المشتقات لحل مشكلات',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-psd-1', conceptId: 'problem-solving-derivatives', chapterId: 'derivatives', conceptName: 'القيمة الدنيا لدالة ناطقة',
        questionNumber: 1, questionText: 'لتكن f(x) = (x^2 + 1) / x على ]0, +∞[. القيمة الدنيا للدالة f هي:',
        options: [
          { id: 'tq_psd1_o1', text: '', mathTex: '2' },
          { id: 'tq_psd1_o2', text: '', mathTex: '1' },
          { id: 'tq_psd1_o3', text: '', mathTex: '0' }
        ],
        correctOptionId: 'tq_psd1_o1',
        explanation: 'f\'(x) = (x^2-1)/x^2 تنعدم وتتغير إشارتها عند x = 1، وهناك f(1) = 2 هي القيمة الدنيا.'
      },
      {
        id: 'tq-psd-2', conceptId: 'problem-solving-derivatives', chapterId: 'derivatives', conceptName: 'موضع القيمة الدنيا',
        questionNumber: 2, questionText: 'تتحقق القيمة الدنيا لنفس الدالة عند:',
        options: [
          { id: 'tq_psd2_o1', text: '', mathTex: 'x = 1' },
          { id: 'tq_psd2_o2', text: '', mathTex: 'x = 0' },
          { id: 'tq_psd2_o3', text: '', mathTex: 'x = 2' }
        ],
        correctOptionId: 'tq_psd2_o1',
        explanation: 'المشتقة تنعدم عند x = 1، وهي القيمة الوحيدة في ]0,+∞[ التي تحقق ذلك.'
      },
      {
        id: 'tq-psd-3', conceptId: 'problem-solving-derivatives', chapterId: 'derivatives', conceptName: 'مسألة تعظيم مساحة',
        questionNumber: 3, questionText: 'لمستطيل محيطه 20 سم، المساحة القصوى الممكنة له هي:',
        options: [
          { id: 'tq_psd3_o1', text: '', mathTex: '25' },
          { id: 'tq_psd3_o2', text: '', mathTex: '20' },
          { id: 'tq_psd3_o3', text: '', mathTex: '50' }
        ],
        correctOptionId: 'tq_psd3_o1',
        explanation: 'A(x) = x(10-x) تبلغ أقصاها عند x = 5 وتساوي A(5) = 25 سم².'
      },
      {
        id: 'tq-psd-4', conceptId: 'problem-solving-derivatives', chapterId: 'derivatives', conceptName: 'بعد المستطيل الأمثل',
        questionNumber: 4, questionText: 'القيمة التي تعطي المساحة القصوى في نفس المسألة هي:',
        options: [
          { id: 'tq_psd4_o1', text: '', mathTex: 'x = 5' },
          { id: 'tq_psd4_o2', text: '', mathTex: 'x = 10' },
          { id: 'tq_psd4_o3', text: '', mathTex: 'x = 2.5' }
        ],
        correctOptionId: 'tq_psd4_o1',
        explanation: 'A\'(x) = 10 - 2x تنعدم عند x = 5.'
      },
      {
        id: 'tq-psd-5', conceptId: 'problem-solving-derivatives', chapterId: 'derivatives', conceptName: 'قاعدة اشتقاق خارج القسمة',
        questionNumber: 5, questionText: 'قاعدة اشتقاق دالة ناطقة على شكل u(x)/v(x) هي:',
        options: [
          { id: 'tq_psd5_o1', text: '', mathTex: "\\frac{u'v - uv'}{v^2}" },
          { id: 'tq_psd5_o2', text: '', mathTex: "\\frac{u'v + uv'}{v^2}" },
          { id: 'tq_psd5_o3', text: '', mathTex: "\\frac{u'}{v'}" }
        ],
        correctOptionId: 'tq_psd5_o1',
        explanation: 'قاعدة اشتقاق خارج القسمة هي (u/v)\' = (u\'v - uv\') / v^2.'
      }
    ]
  },

  'trig-derivatives-diff-equations': {
    id: 'test-trig-derivatives-diff-equations-5',
    conceptId: 'trig-derivatives-diff-equations',
    title: 'اختبار قصير: الدوال المثلثية والمعادلات التفاضلية',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-tdd-1', conceptId: 'trig-derivatives-diff-equations', chapterId: 'derivatives', conceptName: 'اشتقاق دالة مثلثية',
        questionNumber: 1, questionText: 'مشتقة الدالة f(x) = cos(2x) هي:', questionMath: 'f(x) = \\cos(2x)',
        options: [
          { id: 'tq_tdd1_o1', text: '', mathTex: '-2\\sin(2x)' },
          { id: 'tq_tdd1_o2', text: '', mathTex: '2\\sin(2x)' },
          { id: 'tq_tdd1_o3', text: '', mathTex: '-\\sin(2x)' }
        ],
        correctOptionId: 'tq_tdd1_o1',
        explanation: "(cos(u))' = -u' sin(u)، حيث u = 2x."
      },
      {
        id: 'tq-tdd-2', conceptId: 'trig-derivatives-diff-equations', chapterId: 'derivatives', conceptName: 'تعويض في المشتقة',
        questionNumber: 2, questionText: 'قيمة f\'(π/4) لنفس الدالة f(x) = cos(2x) هي:',
        options: [
          { id: 'tq_tdd2_o1', text: '', mathTex: '-2' },
          { id: 'tq_tdd2_o2', text: '', mathTex: '2' },
          { id: 'tq_tdd2_o3', text: '', mathTex: '0' }
        ],
        correctOptionId: 'tq_tdd2_o1',
        explanation: 'f\'(π/4) = -2 sin(π/2) = -2 × 1 = -2.'
      },
      {
        id: 'tq-tdd-3', conceptId: 'trig-derivatives-diff-equations', chapterId: 'derivatives', conceptName: 'الحل العام لمعادلة تفاضلية',
        questionNumber: 3, questionText: 'الحل العام للمعادلة التفاضلية y\'\' + 4y = 0 هو:',
        options: [
          { id: 'tq_tdd3_o1', text: '', mathTex: 'A\\cos(2x) + B\\sin(2x)' },
          { id: 'tq_tdd3_o2', text: '', mathTex: 'Ae^{2x} + B' },
          { id: 'tq_tdd3_o3', text: '', mathTex: 'Ax^2 + Bx' }
        ],
        correctOptionId: 'tq_tdd3_o1',
        explanation: 'الحل العام للمعادلة y\'\' + ω²y = 0 هو y = A cos(ωx) + B sin(ωx) حيث هنا ω = 2.'
      },
      {
        id: 'tq-tdd-4', conceptId: 'trig-derivatives-diff-equations', chapterId: 'derivatives', conceptName: 'الحل الخاص بشروط ابتدائية',
        questionNumber: 4, questionText: 'الحل الخاص للمعادلة y\'\' + 4y = 0 الذي يحقق y(0) = 1 و y\'(0) = 0 هو:',
        options: [
          { id: 'tq_tdd4_o1', text: '', mathTex: '\\cos(2x)' },
          { id: 'tq_tdd4_o2', text: '', mathTex: '\\sin(2x)' },
          { id: 'tq_tdd4_o3', text: '', mathTex: '\\cos(2x) + 1' }
        ],
        correctOptionId: 'tq_tdd4_o1',
        explanation: 'من y(0)=1 نجد A=1، ومن y\'(0)=0 نجد B=0، فالحل الخاص هو cos(2x).'
      },
      {
        id: 'tq-tdd-5', conceptId: 'trig-derivatives-diff-equations', chapterId: 'derivatives', conceptName: 'تعويض في الحل الخاص',
        questionNumber: 5, questionText: 'قيمة y(π/2) لنفس الحل الخاص y(x) = cos(2x) هي:',
        options: [
          { id: 'tq_tdd5_o1', text: '', mathTex: '-1' },
          { id: 'tq_tdd5_o2', text: '', mathTex: '1' },
          { id: 'tq_tdd5_o3', text: '', mathTex: '0' }
        ],
        correctOptionId: 'tq_tdd5_o1',
        explanation: 'y(π/2) = cos(π) = -1.'
      }
    ]
  },

  'exponential-definition-props': {
    id: 'test-exponential-definition-props-5',
    conceptId: 'exponential-definition-props',
    title: 'اختبار قصير: تعريف وخواص الدالة الأسية',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-edp-1', conceptId: 'exponential-definition-props', chapterId: 'exponential-logarithmic', conceptName: 'خاصية أساسية',
        questionNumber: 1, questionText: 'قيمة e^0 هي:',
        options: [
          { id: 'tq_edp1_o1', text: '', mathTex: '1' },
          { id: 'tq_edp1_o2', text: '', mathTex: '0' },
          { id: 'tq_edp1_o3', text: '', mathTex: 'e' }
        ],
        correctOptionId: 'tq_edp1_o1',
        explanation: 'من خواص الدالة الأسية الأساسية: e^0 = 1.'
      },
      {
        id: 'tq-edp-2', conceptId: 'exponential-definition-props', chapterId: 'exponential-logarithmic', conceptName: 'اشتقاق الدالة الأسية',
        questionNumber: 2, questionText: 'لتكن f(x) = e^x. قيمة f\'(0) هي:',
        options: [
          { id: 'tq_edp2_o1', text: '', mathTex: '1' },
          { id: 'tq_edp2_o2', text: '', mathTex: '0' },
          { id: 'tq_edp2_o3', text: '', mathTex: 'e' }
        ],
        correctOptionId: 'tq_edp2_o1',
        explanation: 'الدالة الأسية تحقق f\' = f، إذن f\'(0) = f(0) = e^0 = 1.'
      },
      {
        id: 'tq-edp-3', conceptId: 'exponential-definition-props', chapterId: 'exponential-logarithmic', conceptName: 'جداء أسي',
        questionNumber: 3, questionText: 'إذا كتبنا e^(2x) × e^x على الشكل e^(ax)، فإن قيمة a هي:',
        options: [
          { id: 'tq_edp3_o1', text: '', mathTex: '3' },
          { id: 'tq_edp3_o2', text: '', mathTex: '2' },
          { id: 'tq_edp3_o3', text: '', mathTex: '1' }
        ],
        correctOptionId: 'tq_edp3_o1',
        explanation: 'e^(2x) × e^x = e^(2x+x) = e^(3x).'
      },
      {
        id: 'tq-edp-4', conceptId: 'exponential-definition-props', chapterId: 'exponential-logarithmic', conceptName: 'مجال التعريف',
        questionNumber: 4, questionText: 'مجال تعريف الدالة الأسية exp هو:',
        options: [
          { id: 'tq_edp4_o1', text: '', mathTex: '\\mathbb{R}' },
          { id: 'tq_edp4_o2', text: '', mathTex: ']0,+\\infty[' },
          { id: 'tq_edp4_o3', text: '', mathTex: '\\mathbb{R}^*' }
        ],
        correctOptionId: 'tq_edp4_o1',
        explanation: 'الدالة الأسية معرفة على كامل مجموعة الأعداد الحقيقية ℝ.'
      },
      {
        id: 'tq-edp-5', conceptId: 'exponential-definition-props', chapterId: 'exponential-logarithmic', conceptName: 'إشارة الدالة الأسية',
        questionNumber: 5, questionText: 'إشارة exp(x) على ℝ هي:',
        options: [
          { id: 'tq_edp5_o1', text: 'موجبة قطعاً دائماً' },
          { id: 'tq_edp5_o2', text: 'سالبة قطعاً دائماً' },
          { id: 'tq_edp5_o3', text: 'تتغير حسب إشارة x' }
        ],
        correctOptionId: 'tq_edp5_o1',
        explanation: 'الدالة الأسية exp(x) موجبة قطعاً مهما كانت قيمة x.'
      }
    ]
  },

  'exponential-equations-inequalities': {
    id: 'test-exponential-equations-inequalities-5',
    conceptId: 'exponential-equations-inequalities',
    title: 'اختبار قصير: معادلات ومتراجحات أسية',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-eei-1', conceptId: 'exponential-equations-inequalities', chapterId: 'exponential-logarithmic', conceptName: 'حل معادلة أسية',
        questionNumber: 1, questionText: 'حل المعادلة e^(2x-1) = 1 في ℝ هو:',
        options: [
          { id: 'tq_eei1_o1', text: '', mathTex: 'x = \\frac{1}{2}' },
          { id: 'tq_eei1_o2', text: '', mathTex: 'x = 1' },
          { id: 'tq_eei1_o3', text: '', mathTex: 'x = 0' }
        ],
        correctOptionId: 'tq_eei1_o1',
        explanation: 'e^(2x-1) = e^0 يكافئ 2x - 1 = 0، إذن x = 1/2.'
      },
      {
        id: 'tq-eei-2', conceptId: 'exponential-equations-inequalities', chapterId: 'exponential-logarithmic', conceptName: 'حل متراجحة أسية',
        questionNumber: 2, questionText: 'أصغر عدد صحيح x يحقق المتراجحة e^(x+1) > e^3 هو:',
        options: [
          { id: 'tq_eei2_o1', text: '', mathTex: '3' },
          { id: 'tq_eei2_o2', text: '', mathTex: '2' },
          { id: 'tq_eei2_o3', text: '', mathTex: '4' }
        ],
        correctOptionId: 'tq_eei2_o1',
        explanation: 'المتراجحة تكافئ x + 1 > 3 أي x > 2، وأصغر عدد صحيح أكبر من 2 هو 3.'
      },
      {
        id: 'tq-eei-3', conceptId: 'exponential-equations-inequalities', chapterId: 'exponential-logarithmic', conceptName: 'حل معادلة بنفس الأساس',
        questionNumber: 3, questionText: 'حل المعادلة e^x = e^5 هو:',
        options: [
          { id: 'tq_eei3_o1', text: '', mathTex: 'x = 5' },
          { id: 'tq_eei3_o2', text: '', mathTex: 'x = 1' },
          { id: 'tq_eei3_o3', text: '', mathTex: 'x = e^5' }
        ],
        correctOptionId: 'tq_eei3_o1',
        explanation: 'الدالة الأسية تقابل تام، فتساوي e^x = e^5 يكافئ x = 5.'
      },
      {
        id: 'tq-eei-4', conceptId: 'exponential-equations-inequalities', chapterId: 'exponential-logarithmic', conceptName: 'خاصية التقابل',
        questionNumber: 4, questionText: 'إذا كان e^a = e^b حيث a, b عددان حقيقيان، فإن:',
        options: [
          { id: 'tq_eei4_o1', text: '', mathTex: 'a = b' },
          { id: 'tq_eei4_o2', text: '', mathTex: 'a = -b' },
          { id: 'tq_eei4_o3', text: '', mathTex: 'a = \\frac{1}{b}' }
        ],
        correctOptionId: 'tq_eei4_o1',
        explanation: 'الدالة الأسية تقابل تام على ℝ، فتساوي صورتيها يعني تساوي سابقتيهما.'
      },
      {
        id: 'tq-eei-5', conceptId: 'exponential-equations-inequalities', chapterId: 'exponential-logarithmic', conceptName: 'متراجحة بسيطة',
        questionNumber: 5, questionText: 'حل المتراجحة e^x < 1 في ℝ هو:',
        options: [
          { id: 'tq_eei5_o1', text: '', mathTex: 'x < 0' },
          { id: 'tq_eei5_o2', text: '', mathTex: 'x > 0' },
          { id: 'tq_eei5_o3', text: '', mathTex: 'x < 1' }
        ],
        correctOptionId: 'tq_eei5_o1',
        explanation: 'e^x < 1 = e^0 يكافئ x < 0 لأن الدالة الأسية متزايدة تماما.'
      }
    ]
  },

  'exponential-kx-properties': {
    id: 'test-exponential-kx-properties-5',
    conceptId: 'exponential-kx-properties',
    title: 'اختبار قصير: خواص الدوال الأسية e^(kx)',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-ekp-1', conceptId: 'exponential-kx-properties', chapterId: 'exponential-logarithmic', conceptName: 'اشتقاق e^(kx)',
        questionNumber: 1, questionText: 'لتكن f(t) = 50e^(2t). مشتقتها f\'(t) هي:',
        options: [
          { id: 'tq_ekp1_o1', text: '', mathTex: '100e^{2t}' },
          { id: 'tq_ekp1_o2', text: '', mathTex: '50e^{2t}' },
          { id: 'tq_ekp1_o3', text: '', mathTex: '100e^{t}' }
        ],
        correctOptionId: 'tq_ekp1_o1',
        explanation: "(e^{kt})' = k e^{kt}، حيث k = 2، إذن f'(t) = 50 × 2 × e^{2t} = 100e^{2t}."
      },
      {
        id: 'tq-ekp-2', conceptId: 'exponential-kx-properties', chapterId: 'exponential-logarithmic', conceptName: 'سرعة النمو اللحظية',
        questionNumber: 2, questionText: 'قيمة f\'(0) لنفس الدالة f(t) = 50e^(2t) هي:',
        options: [
          { id: 'tq_ekp2_o1', text: '', mathTex: '100' },
          { id: 'tq_ekp2_o2', text: '', mathTex: '50' },
          { id: 'tq_ekp2_o3', text: '', mathTex: '2' }
        ],
        correctOptionId: 'tq_ekp2_o1',
        explanation: 'f\'(0) = 100 e^0 = 100.'
      },
      {
        id: 'tq-ekp-3', conceptId: 'exponential-kx-properties', chapterId: 'exponential-logarithmic', conceptName: 'حل معادلة من الشكل e^(kx)',
        questionNumber: 3, questionText: 'حل المعادلة 2e^(3x) = 2e^6 في ℝ هو:',
        options: [
          { id: 'tq_ekp3_o1', text: '', mathTex: 'x = 2' },
          { id: 'tq_ekp3_o2', text: '', mathTex: 'x = 3' },
          { id: 'tq_ekp3_o3', text: '', mathTex: 'x = 6' }
        ],
        correctOptionId: 'tq_ekp3_o1',
        explanation: 'بقسمة الطرفين على 2 نحصل على e^(3x) = e^6، إذن 3x = 6 أي x = 2.'
      },
      {
        id: 'tq-ekp-4', conceptId: 'exponential-kx-properties', chapterId: 'exponential-logarithmic', conceptName: 'القاعدة العامة',
        questionNumber: 4, questionText: 'مشتقة الدالة e^(kx) بدلالة k هي:',
        options: [
          { id: 'tq_ekp4_o1', text: '', mathTex: 'k \\, e^{kx}' },
          { id: 'tq_ekp4_o2', text: '', mathTex: 'e^{kx}' },
          { id: 'tq_ekp4_o3', text: '', mathTex: 'k^2 e^{kx}' }
        ],
        correctOptionId: 'tq_ekp4_o1',
        explanation: "القاعدة العامة: (e^{kx})' = k e^{kx}."
      },
      {
        id: 'tq-ekp-5', conceptId: 'exponential-kx-properties', chapterId: 'exponential-logarithmic', conceptName: 'نهاية عند سالب المعامل',
        questionNumber: 5, questionText: 'عندما يكون k < 0، نهاية الدالة e^(kx) عند +∞ تساوي:',
        options: [
          { id: 'tq_ekp5_o1', text: '', mathTex: '0' },
          { id: 'tq_ekp5_o2', text: '', mathTex: '+\\infty' },
          { id: 'tq_ekp5_o3', text: '', mathTex: '1' }
        ],
        correctOptionId: 'tq_ekp5_o1',
        explanation: 'إذا كان k < 0 فإن kx تؤول إلى -∞ عند +∞، وبالتالي e^(kx) تؤول إلى 0.'
      }
    ]
  },

  'exponential-composite-exp-u': {
    id: 'test-exponential-composite-exp-u-5',
    conceptId: 'exponential-composite-exp-u',
    title: 'اختبار قصير: دراسة الدالة المركبة exp∘u',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-ece-1', conceptId: 'exponential-composite-exp-u', chapterId: 'exponential-logarithmic', conceptName: 'اشتقاق exp(u(x))',
        questionNumber: 1, questionText: 'مشتقة الدالة f(x) = e^(x²-1) هي:', questionMath: 'f(x) = e^{x^2-1}',
        options: [
          { id: 'tq_ece1_o1', text: '', mathTex: '2x\\, e^{x^2-1}' },
          { id: 'tq_ece1_o2', text: '', mathTex: 'e^{x^2-1}' },
          { id: 'tq_ece1_o3', text: '', mathTex: '2x\\, e^{x^2}' }
        ],
        correctOptionId: 'tq_ece1_o1',
        explanation: "(e^u)' = u' e^u حيث u(x) = x²-1 و u'(x) = 2x."
      },
      {
        id: 'tq-ece-2', conceptId: 'exponential-composite-exp-u', chapterId: 'exponential-logarithmic', conceptName: 'تعويض في المشتقة',
        questionNumber: 2, questionText: 'قيمة f\'(1) لنفس الدالة f(x) = e^(x²-1) هي:',
        options: [
          { id: 'tq_ece2_o1', text: '', mathTex: '2' },
          { id: 'tq_ece2_o2', text: '', mathTex: '0' },
          { id: 'tq_ece2_o3', text: '', mathTex: '1' }
        ],
        correctOptionId: 'tq_ece2_o1',
        explanation: 'f\'(1) = 2(1) e^(1-1) = 2 e^0 = 2.'
      },
      {
        id: 'tq-ece-3', conceptId: 'exponential-composite-exp-u', chapterId: 'exponential-logarithmic', conceptName: 'القاعدة العامة',
        questionNumber: 3, questionText: 'قاعدة اشتقاق الدالة المركبة e^(u(x)) هي:',
        options: [
          { id: 'tq_ece3_o1', text: '', mathTex: "u' e^u" },
          { id: 'tq_ece3_o2', text: '', mathTex: 'e^{u\'}' },
          { id: 'tq_ece3_o3', text: '', mathTex: "u\\, e^{u'}" }
        ],
        correctOptionId: 'tq_ece3_o1',
        explanation: "(e^u)' = u' e^u هي القاعدة العامة لاشتقاق الدالة المركبة الأسية."
      },
      {
        id: 'tq-ece-4', conceptId: 'exponential-composite-exp-u', chapterId: 'exponential-logarithmic', conceptName: 'نهاية دالة مركبة',
        questionNumber: 4, questionText: 'نهاية الدالة f(x) = e^(-x²+1) عندما x تؤول إلى +∞ هي:',
        options: [
          { id: 'tq_ece4_o1', text: '', mathTex: '0' },
          { id: 'tq_ece4_o2', text: '', mathTex: '+\\infty' },
          { id: 'tq_ece4_o3', text: '', mathTex: '1' }
        ],
        correctOptionId: 'tq_ece4_o1',
        explanation: '-x²+1 تؤول إلى -∞ عند +∞، ونهاية e إلى الأس عند -∞ هي 0.'
      },
      {
        id: 'tq-ece-5', conceptId: 'exponential-composite-exp-u', chapterId: 'exponential-logarithmic', conceptName: 'نهاية أخرى',
        questionNumber: 5, questionText: 'نهاية الدالة e^(x²) عندما x تؤول إلى +∞ هي:',
        options: [
          { id: 'tq_ece5_o1', text: '', mathTex: '+\\infty' },
          { id: 'tq_ece5_o2', text: '', mathTex: '0' },
          { id: 'tq_ece5_o3', text: '', mathTex: '1' }
        ],
        correctOptionId: 'tq_ece5_o1',
        explanation: 'x² تؤول إلى +∞ عند +∞، ونهاية e إلى الأس عند +∞ هي +∞.'
      }
    ]
  },

  'logarithm-definition-props': {
    id: 'test-logarithm-definition-props-5',
    conceptId: 'logarithm-definition-props',
    title: 'اختبار قصير: تعريف وخواص الدالة اللوغاريتمية',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-ldp-1', conceptId: 'logarithm-definition-props', chapterId: 'exponential-logarithmic', conceptName: 'قيم خاصة',
        questionNumber: 1, questionText: 'قيمة ln(1) هي:',
        options: [
          { id: 'tq_ldp1_o1', text: '', mathTex: '0' },
          { id: 'tq_ldp1_o2', text: '', mathTex: '1' },
          { id: 'tq_ldp1_o3', text: '', mathTex: 'e' }
        ],
        correctOptionId: 'tq_ldp1_o1',
        explanation: 'من خواص اللوغاريتم النيبيري: ln(1) = 0.'
      },
      {
        id: 'tq-ldp-2', conceptId: 'logarithm-definition-props', chapterId: 'exponential-logarithmic', conceptName: 'قيم خاصة',
        questionNumber: 2, questionText: 'قيمة ln(e) هي:',
        options: [
          { id: 'tq_ldp2_o1', text: '', mathTex: '1' },
          { id: 'tq_ldp2_o2', text: '', mathTex: '0' },
          { id: 'tq_ldp2_o3', text: '', mathTex: 'e' }
        ],
        correctOptionId: 'tq_ldp2_o1',
        explanation: 'ln(e) = 1 بالتعريف.'
      },
      {
        id: 'tq-ldp-3', conceptId: 'logarithm-definition-props', chapterId: 'exponential-logarithmic', conceptName: 'خاصية ln(e^n)',
        questionNumber: 3, questionText: 'قيمة ln(e^3) - ln(e) هي:',
        options: [
          { id: 'tq_ldp3_o1', text: '', mathTex: '2' },
          { id: 'tq_ldp3_o2', text: '', mathTex: '3' },
          { id: 'tq_ldp3_o3', text: '', mathTex: '4' }
        ],
        correctOptionId: 'tq_ldp3_o1',
        explanation: 'ln(e^3) = 3 و ln(e) = 1، والفرق يساوي 2.'
      },
      {
        id: 'tq-ldp-4', conceptId: 'logarithm-definition-props', chapterId: 'exponential-logarithmic', conceptName: 'تبسيط لوغاريتمي',
        questionNumber: 4, questionText: 'إذا كتبنا ln(8) - ln(2) على شكل a ln(2)، فإن قيمة a هي:',
        options: [
          { id: 'tq_ldp4_o1', text: '', mathTex: '2' },
          { id: 'tq_ldp4_o2', text: '', mathTex: '4' },
          { id: 'tq_ldp4_o3', text: '', mathTex: '1' }
        ],
        correctOptionId: 'tq_ldp4_o1',
        explanation: 'ln(8) - ln(2) = ln(4) = ln(2²) = 2 ln(2).'
      },
      {
        id: 'tq-ldp-5', conceptId: 'logarithm-definition-props', chapterId: 'exponential-logarithmic', conceptName: 'مجال التعريف',
        questionNumber: 5, questionText: 'مجال تعريف الدالة ln هو:',
        options: [
          { id: 'tq_ldp5_o1', text: '', mathTex: ']0,+\\infty[' },
          { id: 'tq_ldp5_o2', text: '', mathTex: '\\mathbb{R}' },
          { id: 'tq_ldp5_o3', text: '', mathTex: '\\mathbb{R}^*' }
        ],
        correctOptionId: 'tq_ldp5_o1',
        explanation: 'اللوغاريتم النيبيري معرف فقط على الأعداد الحقيقية الموجبة قطعاً.'
      }
    ]
  },

  'logarithm-equations-inequalities': {
    id: 'test-logarithm-equations-inequalities-5',
    conceptId: 'logarithm-equations-inequalities',
    title: 'اختبار قصير: معادلات ومتراجحات لوغاريتمية',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-lei-1', conceptId: 'logarithm-equations-inequalities', chapterId: 'exponential-logarithmic', conceptName: 'حل معادلة لوغاريتمية',
        questionNumber: 1, questionText: 'حل المعادلة ln(x) = 2 في ℝ هو:',
        options: [
          { id: 'tq_lei1_o1', text: '', mathTex: 'x = e^2' },
          { id: 'tq_lei1_o2', text: '', mathTex: 'x = 2' },
          { id: 'tq_lei1_o3', text: '', mathTex: 'x = e' }
        ],
        correctOptionId: 'tq_lei1_o1',
        explanation: 'بتطبيق الدالة الأسية على الطرفين نحصل على x = e².'
      },
      {
        id: 'tq-lei-2', conceptId: 'logarithm-equations-inequalities', chapterId: 'exponential-logarithmic', conceptName: 'مجموعة حلول متراجحة',
        questionNumber: 2, questionText: 'مجموعة حلول المتراجحة ln(x-1) < ln(4) مع مراعاة مجال التعريف هي:',
        options: [
          { id: 'tq_lei2_o1', text: '', mathTex: ']1,5[' },
          { id: 'tq_lei2_o2', text: '', mathTex: ']1,4[' },
          { id: 'tq_lei2_o3', text: '', mathTex: ']-\\infty,5[' }
        ],
        correctOptionId: 'tq_lei2_o1',
        explanation: 'مجال التعريف يفرض x > 1، والمتراجحة تكافئ x < 5، فمجموعة الحلول هي ]1,5[.'
      },
      {
        id: 'tq-lei-3', conceptId: 'logarithm-equations-inequalities', chapterId: 'exponential-logarithmic', conceptName: 'أكبر حل صحيح',
        questionNumber: 3, questionText: 'أكبر عدد صحيح يحقق المتراجحة السابقة ln(x-1) < ln(4) هو:',
        options: [
          { id: 'tq_lei3_o1', text: '', mathTex: '4' },
          { id: 'tq_lei3_o2', text: '', mathTex: '5' },
          { id: 'tq_lei3_o3', text: '', mathTex: '3' }
        ],
        correctOptionId: 'tq_lei3_o1',
        explanation: 'مجموعة الحلول هي ]1,5[، وأكبر عدد صحيح فيها هو 4.'
      },
      {
        id: 'tq-lei-4', conceptId: 'logarithm-equations-inequalities', chapterId: 'exponential-logarithmic', conceptName: 'خاصية التقابل',
        questionNumber: 4, questionText: 'إذا كان ln(a) = ln(b) مع a, b > 0، فإن:',
        options: [
          { id: 'tq_lei4_o1', text: '', mathTex: 'a = b' },
          { id: 'tq_lei4_o2', text: '', mathTex: 'a = -b' },
          { id: 'tq_lei4_o3', text: '', mathTex: 'a = \\frac{1}{b}' }
        ],
        correctOptionId: 'tq_lei4_o1',
        explanation: 'الدالة ln تقابل تام على ]0,+∞[، فتساوي الصورتين يكافئ تساوي السابقتين.'
      },
      {
        id: 'tq-lei-5', conceptId: 'logarithm-equations-inequalities', chapterId: 'exponential-logarithmic', conceptName: 'معادلة بسيطة',
        questionNumber: 5, questionText: 'حل المعادلة ln(x) = 0 هو:',
        options: [
          { id: 'tq_lei5_o1', text: '', mathTex: 'x = 1' },
          { id: 'tq_lei5_o2', text: '', mathTex: 'x = 0' },
          { id: 'tq_lei5_o3', text: '', mathTex: 'x = e' }
        ],
        correctOptionId: 'tq_lei5_o1',
        explanation: 'ln(x) = 0 = ln(1) يكافئ x = 1.'
      }
    ]
  },

  'logarithm-composite-and-decimal': {
    id: 'test-logarithm-composite-and-decimal-5',
    conceptId: 'logarithm-composite-and-decimal',
    title: 'اختبار قصير: الدالة ln∘u واللوغاريتم العشري',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-lcd-1', conceptId: 'logarithm-composite-and-decimal', chapterId: 'exponential-logarithmic', conceptName: 'اشتقاق ln(u(x))',
        questionNumber: 1, questionText: 'مشتقة الدالة f(x) = ln(x² + 1) هي:', questionMath: 'f(x) = \\ln(x^2+1)',
        options: [
          { id: 'tq_lcd1_o1', text: '', mathTex: '\\frac{2x}{x^2+1}' },
          { id: 'tq_lcd1_o2', text: '', mathTex: '\\frac{1}{x^2+1}' },
          { id: 'tq_lcd1_o3', text: '', mathTex: '2x' }
        ],
        correctOptionId: 'tq_lcd1_o1',
        explanation: "(ln(u))' = u'/u حيث u(x) = x²+1 و u'(x) = 2x."
      },
      {
        id: 'tq-lcd-2', conceptId: 'logarithm-composite-and-decimal', chapterId: 'exponential-logarithmic', conceptName: 'تعويض في المشتقة',
        questionNumber: 2, questionText: 'قيمة f\'(1) لنفس الدالة f(x) = ln(x²+1) هي:',
        options: [
          { id: 'tq_lcd2_o1', text: '', mathTex: '1' },
          { id: 'tq_lcd2_o2', text: '', mathTex: '2' },
          { id: 'tq_lcd2_o3', text: '', mathTex: '0.5' }
        ],
        correctOptionId: 'tq_lcd2_o1',
        explanation: 'f\'(1) = 2(1)/(1²+1) = 2/2 = 1.'
      },
      {
        id: 'tq-lcd-3', conceptId: 'logarithm-composite-and-decimal', chapterId: 'exponential-logarithmic', conceptName: 'القاعدة العامة',
        questionNumber: 3, questionText: 'قاعدة اشتقاق الدالة المركبة ln(u(x)) هي:',
        options: [
          { id: 'tq_lcd3_o1', text: '', mathTex: "\\frac{u'}{u}" },
          { id: 'tq_lcd3_o2', text: '', mathTex: '\\frac{1}{u}' },
          { id: 'tq_lcd3_o3', text: '', mathTex: "u'" }
        ],
        correctOptionId: 'tq_lcd3_o1',
        explanation: "(ln(u))' = u'/u هي القاعدة العامة."
      },
      {
        id: 'tq-lcd-4', conceptId: 'logarithm-composite-and-decimal', chapterId: 'exponential-logarithmic', conceptName: 'اللوغاريتم العشري',
        questionNumber: 4, questionText: 'قيمة log(1000) حيث log هو اللوغاريتم العشري (الأساس 10) هي:',
        options: [
          { id: 'tq_lcd4_o1', text: '', mathTex: '3' },
          { id: 'tq_lcd4_o2', text: '', mathTex: '10' },
          { id: 'tq_lcd4_o3', text: '', mathTex: '1000' }
        ],
        correctOptionId: 'tq_lcd4_o1',
        explanation: '1000 = 10^3، إذن log(1000) = 3.'
      },
      {
        id: 'tq-lcd-5', conceptId: 'logarithm-composite-and-decimal', chapterId: 'exponential-logarithmic', conceptName: 'اللوغاريتم العشري',
        questionNumber: 5, questionText: 'قيمة log(100) هي:',
        options: [
          { id: 'tq_lcd5_o1', text: '', mathTex: '2' },
          { id: 'tq_lcd5_o2', text: '', mathTex: '10' },
          { id: 'tq_lcd5_o3', text: '', mathTex: '100' }
        ],
        correctOptionId: 'tq_lcd5_o1',
        explanation: '100 = 10^2، إذن log(100) = 2.'
      }
    ]
  },

  'differential-equations-ay-b': {
    id: 'test-differential-equations-ay-b-5',
    conceptId: 'differential-equations-ay-b',
    title: "اختبار قصير: معادلات تفاضلية من الشكل y' = ay + b",
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-dae-1', conceptId: 'differential-equations-ay-b', chapterId: 'exponential-logarithmic', conceptName: 'الحل العام',
        questionNumber: 1, questionText: "الحل العام للمعادلة التفاضلية y' = ay + b (حيث a ≠ 0) يكتب على الشكل:",
        options: [
          { id: 'tq_dae1_o1', text: '', mathTex: 'y = Ce^{ax} - \\frac{b}{a}' },
          { id: 'tq_dae1_o2', text: '', mathTex: 'y = Ce^{ax} + b' },
          { id: 'tq_dae1_o3', text: '', mathTex: 'y = Cx + \\frac{b}{a}' }
        ],
        correctOptionId: 'tq_dae1_o1',
        explanation: 'الحل العام يتكون من حل المعادلة المتجانسة Ce^(ax) زائد الحل الخاص الثابت -b/a.'
      },
      {
        id: 'tq-dae-2', conceptId: 'differential-equations-ay-b', chapterId: 'exponential-logarithmic', conceptName: 'الحل الخاص الثابت',
        questionNumber: 2, questionText: "الحل الخاص الثابت للمعادلة y' = 2y - 4 هو:",
        options: [
          { id: 'tq_dae2_o1', text: '', mathTex: 'y = 2' },
          { id: 'tq_dae2_o2', text: '', mathTex: 'y = 4' },
          { id: 'tq_dae2_o3', text: '', mathTex: 'y = -2' }
        ],
        correctOptionId: 'tq_dae2_o1',
        explanation: 'الحل الخاص الثابت هو y_p = -b/a = -(-4)/2 = 2.'
      },
      {
        id: 'tq-dae-3', conceptId: 'differential-equations-ay-b', chapterId: 'exponential-logarithmic', conceptName: 'إيجاد الثابت C',
        questionNumber: 3, questionText: 'إذا كان الحل العام y = Ce^(2x) + 2 ويحقق y(0) = 5، فإن قيمة C هي:',
        options: [
          { id: 'tq_dae3_o1', text: '', mathTex: '3' },
          { id: 'tq_dae3_o2', text: '', mathTex: '5' },
          { id: 'tq_dae3_o3', text: '', mathTex: '2' }
        ],
        correctOptionId: 'tq_dae3_o1',
        explanation: 'y(0) = C + 2 = 5، إذن C = 3.'
      },
      {
        id: 'tq-dae-4', conceptId: 'differential-equations-ay-b', chapterId: 'exponential-logarithmic', conceptName: 'الحل الخاص الثابت لمعادلة أخرى',
        questionNumber: 4, questionText: "الحل الخاص الثابت للمعادلة y' = -3y + 6 هو:",
        options: [
          { id: 'tq_dae4_o1', text: '', mathTex: 'y = 2' },
          { id: 'tq_dae4_o2', text: '', mathTex: 'y = -2' },
          { id: 'tq_dae4_o3', text: '', mathTex: 'y = 6' }
        ],
        correctOptionId: 'tq_dae4_o1',
        explanation: 'y_p = -b/a = -6/(-3) = 2.'
      },
      {
        id: 'tq-dae-5', conceptId: 'differential-equations-ay-b', chapterId: 'exponential-logarithmic', conceptName: 'إيجاد ثابت آخر',
        questionNumber: 5, questionText: 'إذا كان الحل العام y = Ce^(-3x) + 2 ويحقق y(0) = 1، فإن قيمة C هي:',
        options: [
          { id: 'tq_dae5_o1', text: '', mathTex: '-1' },
          { id: 'tq_dae5_o2', text: '', mathTex: '1' },
          { id: 'tq_dae5_o3', text: '', mathTex: '3' }
        ],
        correctOptionId: 'tq_dae5_o1',
        explanation: 'y(0) = C + 2 = 1، إذن C = -1.'
      }
    ]
  },

  'limits-infinite-asymptotes': {
    id: 'test-limits-infinite-asymptotes-5',
    conceptId: 'limits-infinite-asymptotes',
    title: 'اختبار قصير: النهايات عند الحدود والمستقيمات المقاربة',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-lia-1', conceptId: 'limits-infinite-asymptotes', chapterId: 'limits', conceptName: 'نهاية عند +∞',
        questionNumber: 1, questionText: 'نهاية الدالة f(x) = (2x+1)/(x-3) عندما x تؤول إلى +∞ هي:',
        options: [
          { id: 'tq_lia1_o1', text: '', mathTex: '2' },
          { id: 'tq_lia1_o2', text: '', mathTex: '0' },
          { id: 'tq_lia1_o3', text: '', mathTex: '+\\infty' }
        ],
        correctOptionId: 'tq_lia1_o1',
        explanation: 'بقسمة البسط والمقام على x نحصل على النهاية 2/1 = 2.'
      },
      {
        id: 'tq-lia-2', conceptId: 'limits-infinite-asymptotes', chapterId: 'limits', conceptName: 'المستقيم المقارب الأفقي',
        questionNumber: 2, questionText: 'معادلة المستقيم المقارب الأفقي الموافق لنفس الدالة عند +∞ هي:',
        options: [
          { id: 'tq_lia2_o1', text: '', mathTex: 'y = 2' },
          { id: 'tq_lia2_o2', text: '', mathTex: 'y = 0' },
          { id: 'tq_lia2_o3', text: '', mathTex: 'x = 2' }
        ],
        correctOptionId: 'tq_lia2_o1',
        explanation: 'بما أن نهاية الدالة عند +∞ هي 2، فمعادلة المستقيم المقارب الأفقي هي y = 2.'
      },
      {
        id: 'tq-lia-3', conceptId: 'limits-infinite-asymptotes', chapterId: 'limits', conceptName: 'المستقيم المقارب العمودي',
        questionNumber: 3, questionText: 'للدالة f(x) = 1/(x-2)، فاصلة المستقيم المقارب العمودي هي:',
        options: [
          { id: 'tq_lia3_o1', text: '', mathTex: 'x = 2' },
          { id: 'tq_lia3_o2', text: '', mathTex: 'x = 0' },
          { id: 'tq_lia3_o3', text: '', mathTex: 'x = 1' }
        ],
        correctOptionId: 'tq_lia3_o1',
        explanation: 'المقام ينعدم عند x = 2، وهي فاصلة المستقيم المقارب العمودي.'
      },
      {
        id: 'tq-lia-4', conceptId: 'limits-infinite-asymptotes', chapterId: 'limits', conceptName: 'نهاية دالة ناطقة عند اللانهاية',
        questionNumber: 4, questionText: 'نهاية الدالة 1/(x-2) عندما x تؤول إلى +∞ هي:',
        options: [
          { id: 'tq_lia4_o1', text: '', mathTex: '0' },
          { id: 'tq_lia4_o2', text: '', mathTex: '+\\infty' },
          { id: 'tq_lia4_o3', text: '', mathTex: '2' }
        ],
        correctOptionId: 'tq_lia4_o1',
        explanation: 'كلما كبرت x يصغر المقام مقلوبه، فتؤول الدالة إلى 0.'
      },
      {
        id: 'tq-lia-5', conceptId: 'limits-infinite-asymptotes', chapterId: 'limits', conceptName: 'نهاية كثير حدود',
        questionNumber: 5, questionText: 'نهاية الدالة 3x² عندما x تؤول إلى +∞ هي:',
        options: [
          { id: 'tq_lia5_o1', text: '', mathTex: '+\\infty' },
          { id: 'tq_lia5_o2', text: '', mathTex: '-\\infty' },
          { id: 'tq_lia5_o3', text: '', mathTex: '0' }
        ],
        correctOptionId: 'tq_lia5_o1',
        explanation: 'حد أعلى درجة موجب المعامل يؤول إلى +∞ عند +∞.'
      }
    ]
  },

  'limits-operations-composite': {
    id: 'test-limits-operations-composite-5',
    conceptId: 'limits-operations-composite',
    title: 'اختبار قصير: العمليات على النهايات ونهاية دالة مركبة',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-loc-1', conceptId: 'limits-operations-composite', chapterId: 'limits', conceptName: 'إزالة شكل غير معين',
        questionNumber: 1, questionText: 'نهاية الدالة (x²+3x)/x عندما x تؤول إلى 0 هي:',
        options: [
          { id: 'tq_loc1_o1', text: '', mathTex: '3' },
          { id: 'tq_loc1_o2', text: '', mathTex: '0' },
          { id: 'tq_loc1_o3', text: '', mathTex: '+\\infty' }
        ],
        correctOptionId: 'tq_loc1_o1',
        explanation: 'بتبسيط العبارة نحصل على x+3، ونهايتها عند x=0 هي 3.'
      },
      {
        id: 'tq-loc-2', conceptId: 'limits-operations-composite', chapterId: 'limits', conceptName: 'نهاية دالة مركبة',
        questionNumber: 2, questionText: 'نهاية الدالة 1/(x²-1) عندما x تؤول إلى +∞ هي:',
        options: [
          { id: 'tq_loc2_o1', text: '', mathTex: '0' },
          { id: 'tq_loc2_o2', text: '', mathTex: '1' },
          { id: 'tq_loc2_o3', text: '', mathTex: '+\\infty' }
        ],
        correctOptionId: 'tq_loc2_o1',
        explanation: 'x²-1 تؤول إلى +∞، ومقلوب عدد يؤول إلى +∞ يؤول إلى 0.'
      },
      {
        id: 'tq-loc-3', conceptId: 'limits-operations-composite', chapterId: 'limits', conceptName: 'مبرهنة نهاية دالة مركبة',
        questionNumber: 3, questionText: 'إذا كانت نهاية g(x) عند x0 تساوي +∞، ونهاية f(t) عند +∞ تساوي 0، فإن نهاية (f∘g)(x) عند x0 هي:',
        options: [
          { id: 'tq_loc3_o1', text: '', mathTex: '0' },
          { id: 'tq_loc3_o2', text: '', mathTex: '+\\infty' },
          { id: 'tq_loc3_o3', text: 'غير موجودة' }
        ],
        correctOptionId: 'tq_loc3_o1',
        explanation: 'حسب مبرهنة نهاية الدالة المركبة، نهاية f∘g عند x0 تساوي نهاية f عند +∞، أي 0.'
      },
      {
        id: 'tq-loc-4', conceptId: 'limits-operations-composite', chapterId: 'limits', conceptName: 'عمليات على النهايات',
        questionNumber: 4, questionText: 'إذا كانت نهاية كل من دالتين تؤول إلى +∞ عند نقطة ما، فإن نهاية مجموعهما عند تلك النقطة تساوي:',
        options: [
          { id: 'tq_loc4_o1', text: '', mathTex: '+\\infty' },
          { id: 'tq_loc4_o2', text: '', mathTex: '0' },
          { id: 'tq_loc4_o3', text: 'شكل غير معين دائماً' }
        ],
        correctOptionId: 'tq_loc4_o1',
        explanation: 'مجموع نهايتين كلتاهما +∞ يساوي +∞ (ليس شكلاً غير معين).'
      },
      {
        id: 'tq-loc-5', conceptId: 'limits-operations-composite', chapterId: 'limits', conceptName: 'الأشكال غير المعينة',
        questionNumber: 5, questionText: 'الشكل ∞/∞ يعتبر:',
        options: [
          { id: 'tq_loc5_o1', text: 'شكلاً غير معين يتطلب معالجة خاصة' },
          { id: 'tq_loc5_o2', text: 'يساوي دائماً 1' },
          { id: 'tq_loc5_o3', text: 'يساوي دائماً 0' }
        ],
        correctOptionId: 'tq_loc5_o1',
        explanation: '∞/∞ من الأشكال غير المعينة السبعة التي تتطلب تقنيات خاصة (تبسيط، حصر، إلخ) لحساب النهاية.'
      }
    ]
  },

  'limits-comparison-squeeze': {
    id: 'test-limits-comparison-squeeze-5',
    conceptId: 'limits-comparison-squeeze',
    title: 'اختبار قصير: مبرهنتا المقارنة والحصر',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-lcs-1', conceptId: 'limits-comparison-squeeze', chapterId: 'limits', conceptName: 'مبرهنة الحصر مع sin',
        questionNumber: 1, questionText: 'نهاية الدالة sin(x)/x عندما x تؤول إلى +∞ هي:',
        options: [
          { id: 'tq_lcs1_o1', text: '', mathTex: '0' },
          { id: 'tq_lcs1_o2', text: '', mathTex: '1' },
          { id: 'tq_lcs1_o3', text: '', mathTex: '+\\infty' }
        ],
        correctOptionId: 'tq_lcs1_o1',
        explanation: 'الدالة محصورة بين -1/x و1/x اللتين تؤولان إلى 0 عند +∞.'
      },
      {
        id: 'tq-lcs-2', conceptId: 'limits-comparison-squeeze', chapterId: 'limits', conceptName: 'شرط تطبيق مبرهنة الحصر',
        questionNumber: 2, questionText: 'تُستعمل مبرهنة الحصر عندما تكون الدالة:',
        options: [
          { id: 'tq_lcs2_o1', text: 'محصورة بين دالتين لهما نفس النهاية عند نقطة معينة' },
          { id: 'tq_lcs2_o2', text: 'متزايدة تماما فقط' },
          { id: 'tq_lcs2_o3', text: 'متصلة فقط' }
        ],
        correctOptionId: 'tq_lcs2_o1',
        explanation: 'مبرهنة الحصر تنطبق عندما تنحصر الدالة بين حدين يؤولان لنفس النهاية.'
      },
      {
        id: 'tq-lcs-3', conceptId: 'limits-comparison-squeeze', chapterId: 'limits', conceptName: 'تطبيق مبرهنة الحصر',
        questionNumber: 3, questionText: 'إذا كان 2x-1 ≤ f(x) ≤ 2x+1 من أجل x كبيرة بما فيه الكفاية، فإن نهاية f(x)/x عند +∞ هي:',
        options: [
          { id: 'tq_lcs3_o1', text: '', mathTex: '2' },
          { id: 'tq_lcs3_o2', text: '', mathTex: '1' },
          { id: 'tq_lcs3_o3', text: '', mathTex: '0' }
        ],
        correctOptionId: 'tq_lcs3_o1',
        explanation: 'بقسمة التأطير على x نحصل على حدين يؤولان إلى 2.'
      },
      {
        id: 'tq-lcs-4', conceptId: 'limits-comparison-squeeze', chapterId: 'limits', conceptName: 'مبرهنة المقارنة',
        questionNumber: 4, questionText: 'إذا كانت f(x) ≥ g(x) بجوار +∞ وكانت نهاية g(x) عند +∞ تساوي +∞، فإن نهاية f(x) عند +∞ هي:',
        options: [
          { id: 'tq_lcs4_o1', text: '', mathTex: '+\\infty' },
          { id: 'tq_lcs4_o2', text: '', mathTex: '0' },
          { id: 'tq_lcs4_o3', text: 'غير موجودة' }
        ],
        correctOptionId: 'tq_lcs4_o1',
        explanation: 'حسب مبرهنة المقارنة، إذا كانت f أكبر من دالة تؤول إلى +∞ فهي بدورها تؤول إلى +∞.'
      },
      {
        id: 'tq-lcs-5', conceptId: 'limits-comparison-squeeze', chapterId: 'limits', conceptName: 'تأطير الدوال المثلثية',
        questionNumber: 5, questionText: 'التأطير -1 ≤ cos(x) ≤ 1 يُستعمل غالباً لحصر عبارات تحتوي على:',
        options: [
          { id: 'tq_lcs5_o1', text: '', mathTex: '\\cos(x)' },
          { id: 'tq_lcs5_o2', text: '', mathTex: 'e^x' },
          { id: 'tq_lcs5_o3', text: '', mathTex: '\\ln(x)' }
        ],
        correctOptionId: 'tq_lcs5_o1',
        explanation: 'هذا التأطير خاص بدالة الجيب تمام cos(x) وهو الأساس لتطبيق مبرهنة الحصر عليها.'
      }
    ]
  },

  'asymptotic-behavior-oblique': {
    id: 'test-asymptotic-behavior-oblique-5',
    conceptId: 'asymptotic-behavior-oblique',
    title: 'اختبار قصير: السلوك التقاربي والمستقيم المقارب المائل',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    questions: [
      {
        id: 'tq-abo-1', conceptId: 'asymptotic-behavior-oblique', chapterId: 'limits', conceptName: 'معامل الميل a',
        questionNumber: 1, questionText: 'لتكن f(x) = (x²+3x+2)/x = x + 3 + 2/x. معامل الميل a للمستقيم المقارب المائل عند +∞ هو:',
        options: [
          { id: 'tq_abo1_o1', text: '', mathTex: '1' },
          { id: 'tq_abo1_o2', text: '', mathTex: '2' },
          { id: 'tq_abo1_o3', text: '', mathTex: '3' }
        ],
        correctOptionId: 'tq_abo1_o1',
        explanation: 'الجزء الخطي في الكتابة x + 3 + 2/x هو x، فمعامل الميل a = 1.'
      },
      {
        id: 'tq-abo-2', conceptId: 'asymptotic-behavior-oblique', chapterId: 'limits', conceptName: 'الحد الثابت b',
        questionNumber: 2, questionText: 'الحد الثابت b لنفس الدالة هو:',
        options: [
          { id: 'tq_abo2_o1', text: '', mathTex: '3' },
          { id: 'tq_abo2_o2', text: '', mathTex: '1' },
          { id: 'tq_abo2_o3', text: '', mathTex: '2' }
        ],
        correctOptionId: 'tq_abo2_o1',
        explanation: 'الحد الثابت في الكتابة x + 3 + 2/x هو 3.'
      },
      {
        id: 'tq-abo-3', conceptId: 'asymptotic-behavior-oblique', chapterId: 'limits', conceptName: 'معادلة المستقيم المائل',
        questionNumber: 3, questionText: 'معادلة المستقيم المقارب المائل لنفس الدالة عند +∞ هي:',
        options: [
          { id: 'tq_abo3_o1', text: '', mathTex: 'y = x + 3' },
          { id: 'tq_abo3_o2', text: '', mathTex: 'y = x + 2' },
          { id: 'tq_abo3_o3', text: '', mathTex: 'y = 2x + 3' }
        ],
        correctOptionId: 'tq_abo3_o1',
        explanation: 'بما أن a = 1 و b = 3، فمعادلة المستقيم المقارب المائل هي y = x + 3.'
      },
      {
        id: 'tq-abo-4', conceptId: 'asymptotic-behavior-oblique', chapterId: 'limits', conceptName: 'الحد المتبقي',
        questionNumber: 4, questionText: 'نهاية الحد المتبقي 2/x عندما x تؤول إلى +∞ هي:',
        options: [
          { id: 'tq_abo4_o1', text: '', mathTex: '0' },
          { id: 'tq_abo4_o2', text: '', mathTex: '2' },
          { id: 'tq_abo4_o3', text: '', mathTex: '+\\infty' }
        ],
        correctOptionId: 'tq_abo4_o1',
        explanation: 'كلما كبرت x يصغر 2/x ويؤول إلى 0.'
      },
      {
        id: 'tq-abo-5', conceptId: 'asymptotic-behavior-oblique', chapterId: 'limits', conceptName: 'شرط وجود المستقيم المائل',
        questionNumber: 5, questionText: 'للتحقق من وجود مستقيم مقارب مائل معادلته y = ax+b عند +∞، يجب أن تؤول العبارة f(x) - (ax+b) إلى:',
        options: [
          { id: 'tq_abo5_o1', text: '', mathTex: '0' },
          { id: 'tq_abo5_o2', text: '', mathTex: '+\\infty' },
          { id: 'tq_abo5_o3', text: '', mathTex: 'a' }
        ],
        correctOptionId: 'tq_abo5_o1',
        explanation: 'شرط وجود مستقيم مقارب مائل هو أن يؤول الفرق بين الدالة والمستقيم إلى 0 عند اللانهاية.'
      }
    ]
  }
};
