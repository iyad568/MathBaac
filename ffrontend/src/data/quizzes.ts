import { QuizQuestion } from '../types';

export const quizQuestions: Record<string, QuizQuestion[]> = {
  // 1. تقويم تشخيصي
  'diagnostic-assessment': [
    {
      id: 'diag-q1',
      conceptId: 'diagnostic-assessment',
      questionNumber: 1,
      questionText: 'مشتقة الدالة f(x) = 2x³ - 5x² + 4 على ℝ هي:',
      questionMath: 'f(x) = 2x^3 - 5x^2 + 4',
      options: [
        { id: 'opt_1', text: '', mathTex: '6x^2 - 10x' },
        { id: 'opt_2', text: '', mathTex: '6x^2 - 10x + 4' },
        { id: 'opt_3', text: '', mathTex: '3x^2 - 5x' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'قاعدة اشتقاق كثير الحدود: (2x³)\' = 6x² و (-5x²)\' = -10x ومشتق الثابت 4 هو 0.',
      explanationMath: 'f\'(x) = 6x^2 - 10x'
    },
    {
      id: 'diag-q2',
      conceptId: 'diagnostic-assessment',
      questionNumber: 2,
      questionText: 'معادلة المماس للمنحنى (C_f) عند النقطة ذات الفاصلة x₀ تُعطى بالصيغة:',
      questionMath: '(T) : ?',
      options: [
        { id: 'opt_1', text: '', mathTex: 'y = f\'(x_0)(x - x_0) + f(x_0)' },
        { id: 'opt_2', text: '', mathTex: 'y = f(x_0)(x - x_0) + f\'(x_0)' },
        { id: 'opt_3', text: '', mathTex: 'y = f\'(x_0)x + f(x_0)' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'المعامل الموجه هو f\'(x₀) ويمر المماس بالنقطة (x₀, f(x₀))، ومنه: y = f\'(x₀)(x - x₀) + f(x₀).',
      explanationMath: 'y = f\'(x_0)(x - x_0) + f(x_0)'
    },
    {
      id: 'diag-q3',
      conceptId: 'diagnostic-assessment',
      questionNumber: 3,
      questionText: 'مشتقة الدالة f(x) = -3x² + 2x - 1 على ℝ هي:',
      questionMath: 'f(x) = -3x^2 + 2x - 1',
      options: [
        { id: 'opt_1', text: '', mathTex: '-6x + 2' },
        { id: 'opt_2', text: '', mathTex: '-6x + 1' },
        { id: 'opt_3', text: '', mathTex: '-3x + 2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'نشتق كل حد: مشتق -3x² هو -6x، ومشتق 2x هو 2، ومشتق الثابت -1 هو 0.',
      explanationMath: 'f\'(x) = -6x + 2'
    },
    {
      id: 'diag-q4',
      conceptId: 'diagnostic-assessment',
      questionNumber: 4,
      questionText: 'مشتقة الدالة f(x) = 4x³ هي:',
      questionMath: 'f(x) = 4x^3',
      options: [
        { id: 'opt_1', text: '', mathTex: '12x^2' },
        { id: 'opt_2', text: '', mathTex: '4x^2' },
        { id: 'opt_3', text: '', mathTex: '12x^3' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'نطبق قاعدة (x^n)\' = n x^(n-1) مضروبة في المعامل 4: 4 × 3x² = 12x².',
      explanationMath: 'f\'(x) = 12x^2'
    },
    {
      id: 'diag-q5',
      conceptId: 'diagnostic-assessment',
      questionNumber: 5,
      questionText: 'لتكن f(x) = x² + 1. قيمة العدد المشتق f\'(2) هي:',
      questionMath: "f'(2) = ?",
      options: [
        { id: 'opt_1', text: '', mathTex: '4' },
        { id: 'opt_2', text: '', mathTex: '2' },
        { id: 'opt_3', text: '', mathTex: '5' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f\'(x) = 2x، إذن f\'(2) = 4.',
      explanationMath: "f'(2) = 4"
    },
    {
      id: 'diag-q6',
      conceptId: 'diagnostic-assessment',
      questionNumber: 6,
      questionText: 'مشتقة الدالة f(x) = x² - 6x + 5 هي:',
      questionMath: 'f(x) = x^2 - 6x + 5',
      options: [
        { id: 'opt_1', text: '', mathTex: '2x - 6' },
        { id: 'opt_2', text: '', mathTex: '2x - 5' },
        { id: 'opt_3', text: '', mathTex: 'x - 6' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'نشتق كل حد: مشتق x² هو 2x، ومشتق -6x هو -6.',
      explanationMath: "f'(x) = 2x - 6"
    },
    {
      id: 'diag-q7',
      conceptId: 'diagnostic-assessment',
      questionNumber: 7,
      questionText: 'مشتقة الدالة الثابتة f(x) = 7 هي:',
      questionMath: 'f(x) = 7',
      options: [
        { id: 'opt_1', text: '', mathTex: '0' },
        { id: 'opt_2', text: '', mathTex: '7' },
        { id: 'opt_3', text: '', mathTex: '1' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'مشتقة أي دالة ثابتة تساوي صفراً دائماً.',
      explanationMath: "f'(x) = 0"
    },
    {
      id: 'diag-q8',
      conceptId: 'diagnostic-assessment',
      questionNumber: 8,
      questionText: 'مشتقة الدالة f(x) = x هي:',
      questionMath: 'f(x) = x',
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: 'x' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'مشتقة الدالة المطابقة (المعرفة بـ f(x) = x) تساوي 1.',
      explanationMath: "f'(x) = 1"
    },
    {
      id: 'diag-q9',
      conceptId: 'diagnostic-assessment',
      questionNumber: 9,
      questionText: 'مشتقة الدالة f(x) = -2x³ هي:',
      questionMath: 'f(x) = -2x^3',
      options: [
        { id: 'opt_1', text: '', mathTex: '-6x^2' },
        { id: 'opt_2', text: '', mathTex: '-2x^2' },
        { id: 'opt_3', text: '', mathTex: '-6x^3' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'نطبق قاعدة (x^n)\' = n x^(n-1): -2 × 3x² = -6x².',
      explanationMath: "f'(x) = -6x^2"
    },
    {
      id: 'diag-q10',
      conceptId: 'diagnostic-assessment',
      questionNumber: 10,
      questionText: 'لتكن f(x) = 3x² - 1. قيمة العدد المشتق f\'(3) هي:',
      questionMath: "f'(3) = ?",
      options: [
        { id: 'opt_1', text: '', mathTex: '18' },
        { id: 'opt_2', text: '', mathTex: '6' },
        { id: 'opt_3', text: '', mathTex: '9' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f\'(x) = 6x، إذن f\'(3) = 18.',
      explanationMath: "f'(3) = 18"
    }
  ],

  // 2. الاستمرارية والمماس
  'continuity-derivatives-basics': [
    {
      id: 'cont-q1',
      conceptId: 'continuity-derivatives-basics',
      questionNumber: 1,
      questionText: 'تكون الدالة f مستمرة عند النقطة x₀ إذا وفقط إذا كان:',
      questionMath: '\\lim_{x \\to x_0} f(x) = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: 'f(x_0)' },
        { id: 'opt_2', text: '', mathTex: 'f\'(x_0)' },
        { id: 'opt_3', text: '', mathTex: '0' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'تعريف الاستمرارية: النهاية عند النقطة تساوي قيمة الدالة عند تلك النقطة.',
      explanationMath: '\\lim_{x \\to x_0} f(x) = f(x_0)'
    },
    {
      id: 'cont-q2',
      conceptId: 'continuity-derivatives-basics',
      questionNumber: 2,
      questionText: 'إذا كان f\'(2) = 0، فإن مماس المنحنى (C_f) عند النقطة ذات الفاصلة 2 يكون:',
      questionMath: 'f\'(2) = 0',
      options: [
        { id: 'opt_1', text: 'أفقياً موازياً لمحور الفواصل', mathTex: 'y = f(2)' },
        { id: 'opt_2', text: 'عمودياً موازياً لمحور التراتيب', mathTex: 'x = 2' },
        { id: 'opt_3', text: 'مائلاً بمعامل توجيه موجب', mathTex: 'y = 2x' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'انعدام العدد المشتق يعني أن معامل توجيه المماس معدوم، وبالتالي المماس أفقي معادلته y = f(2).',
      explanationMath: '(T) : y = f(2)'
    },
    {
      id: 'cont-q3',
      conceptId: 'continuity-derivatives-basics',
      questionNumber: 3,
      questionText: 'مشتقة الدالة f(x) = x³ هي:',
      questionMath: 'f(x) = x^3',
      options: [
        { id: 'opt_1', text: '', mathTex: '3x^2' },
        { id: 'opt_2', text: '', mathTex: 'x^2' },
        { id: 'opt_3', text: '', mathTex: '3x' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'نطبق قاعدة (x^n)\' = n x^(n-1): مشتقة x³ هي 3x².',
      explanationMath: "f'(x) = 3x^2"
    },
    {
      id: 'cont-q4',
      conceptId: 'continuity-derivatives-basics',
      questionNumber: 4,
      questionText: 'إذا كانت الدالة f قابلة للاشتقاق عند النقطة x₀، فإنها بالضرورة:',
      questionMath: 'f \\text{ قابلة للاشتقاق عند } x_0',
      options: [
        { id: 'opt_1', text: 'متصلة عند x₀' },
        { id: 'opt_2', text: 'متزايدة عند x₀' },
        { id: 'opt_3', text: 'دورية عند x₀' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'قابلية الاشتقاق عند نقطة تستلزم الاتصال عندها (الاتصال شرط ضروري لكن غير كاف).',
      explanationMath: '\\text{قابلة للاشتقاق} \\implies \\text{متصلة}'
    },
    {
      id: 'cont-q5',
      conceptId: 'continuity-derivatives-basics',
      questionNumber: 5,
      questionText: 'مشتقة الدالة f(x) = 5x - 3 هي:',
      questionMath: 'f(x) = 5x - 3',
      options: [
        { id: 'opt_1', text: '', mathTex: '5' },
        { id: 'opt_2', text: '', mathTex: '-3' },
        { id: 'opt_3', text: '', mathTex: '5x' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'مشتقة الدالة التآلفية ax + b هي المعامل a، أي 5 هنا.',
      explanationMath: "f'(x) = 5"
    },
    {
      id: 'cont-q6',
      conceptId: 'continuity-derivatives-basics',
      questionNumber: 6,
      questionText: 'لتكن f(x) = x² + 3. قيمة العدد المشتق f\'(1) هي:',
      questionMath: "f'(1) = ?",
      options: [
        { id: 'opt_1', text: '', mathTex: '2' },
        { id: 'opt_2', text: '', mathTex: '1' },
        { id: 'opt_3', text: '', mathTex: '4' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f\'(x) = 2x، إذن f\'(1) = 2.',
      explanationMath: "f'(1) = 2"
    },
    {
      id: 'cont-q7',
      conceptId: 'continuity-derivatives-basics',
      questionNumber: 7,
      questionText: 'نهاية النسبة [f(x₀+h) - f(x₀)] / h عندما h تؤول إلى 0 تسمى:',
      questionMath: '\\lim_{h \\to 0} \\frac{f(x_0+h)-f(x_0)}{h}',
      options: [
        { id: 'opt_1', text: 'العدد المشتق للدالة f عند x₀' },
        { id: 'opt_2', text: 'قيمة الدالة f عند x₀' },
        { id: 'opt_3', text: 'نهاية الدالة f عند x₀' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'هذا هو التعريف الرياضي للعدد المشتق عند نقطة.',
      explanationMath: "f'(x_0)"
    },
    {
      id: 'cont-q8',
      conceptId: 'continuity-derivatives-basics',
      questionNumber: 8,
      questionText: 'مشتقة الدالة f(x) = -x + 4 هي:',
      questionMath: 'f(x) = -x + 4',
      options: [
        { id: 'opt_1', text: '', mathTex: '-1' },
        { id: 'opt_2', text: '', mathTex: '1' },
        { id: 'opt_3', text: '', mathTex: '4' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'مشتقة الدالة التآلفية ax + b هي المعامل a، أي -1 هنا.',
      explanationMath: "f'(x) = -1"
    },
    {
      id: 'cont-q9',
      conceptId: 'continuity-derivatives-basics',
      questionNumber: 9,
      questionText: 'إذا كانت الدالة f متصلة عند النقطة x₀، فإن ذلك:',
      questionMath: '\\lim_{x \\to x_0} f(x) = f(x_0)',
      options: [
        { id: 'opt_1', text: 'لا يعني بالضرورة أنها قابلة للاشتقاق عندها' },
        { id: 'opt_2', text: 'يعني بالضرورة أنها قابلة للاشتقاق عندها' },
        { id: 'opt_3', text: 'يعني أنها دالة ثابتة' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الاتصال شرط ضروري لكن غير كاف لقابلية الاشتقاق (مثال: |x| متصلة عند 0 لكن غير قابلة للاشتقاق عندها).',
      explanationMath: '\\text{متصلة} \\nRightarrow \\text{قابلة للاشتقاق}'
    },
    {
      id: 'cont-q10',
      conceptId: 'continuity-derivatives-basics',
      questionNumber: 10,
      questionText: 'لتكن f(x) = 2x² + x. قيمة العدد المشتق f\'(0) هي:',
      questionMath: "f'(0) = ?",
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '4' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f\'(x) = 4x + 1، إذن f\'(0) = 1.',
      explanationMath: "f'(0) = 1"
    }
  ],

  // 3. مبرهنة القيم المتوسطة TVI
  'mean-value-theorem': [
    {
      id: 'tvi-q1',
      conceptId: 'mean-value-theorem',
      questionNumber: 1,
      questionText: 'لتطبيق مبرهنة القيم المتوسطة لإثبات وجود حل وحيد للمعادلة f(x) = 0 على [a, b]، الشرطان الضروريان هما:',
      questionMath: 'f(\\alpha) = 0',
      options: [
        { id: 'opt_1', text: 'الاستمرارية على [a, b] والرتابة التامة على [a, b] مع f(a)·f(b) < 0', mathTex: 'f(a) \\cdot f(b) < 0' },
        { id: 'opt_2', text: 'الاشتقاقية فقط دون الاستمرارية', mathTex: 'f\'(x) = 0' },
        { id: 'opt_3', text: 'أن تكون f زوجية', mathTex: 'f(-x) = f(x)' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الاستمرارية تضمن وجود حل على الأقل، والرتابة التامة (متزايدة تماماً أو متناقصة تماماً) تضمن وحدانية الحل.',
      explanationMath: 'f(a) \\cdot f(b) < 0 \\implies \\exists! \\alpha \\in ]a, b['
    },
    {
      id: 'tvi-q2',
      conceptId: 'mean-value-theorem',
      questionNumber: 2,
      questionText: 'إذا كانت f متزايدة تماماً على [1, 3] وكان f(1) = -4 و f(3) = 2، فما هي إشارة f(x) على ]1, α[ حيث f(α) = 0؟',
      questionMath: 'x \\in ]1, \\alpha[',
      options: [
        { id: 'opt_1', text: 'سالبة تماماً (f(x) < 0)', mathTex: 'f(x) < 0' },
        { id: 'opt_2', text: 'موجبة تماماً (f(x) > 0)', mathTex: 'f(x) > 0' },
        { id: 'opt_3', text: 'معدومة', mathTex: 'f(x) = 0' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'بما أن f متزايدة تماماً و f(α) = 0، فلكل x < α لدينا f(x) < f(α) = 0، إذن f(x) سالبة تماماً.',
      explanationMath: 'x < \\alpha \\implies f(x) < 0'
    },
    {
      id: 'tvi-q3',
      conceptId: 'mean-value-theorem',
      questionNumber: 3,
      questionText: 'لتكن f(x) = x³ + x - 1 على [0, 1]، علماً أن f(0) = -1 و f(1) = 1. عدد حلول المعادلة f(x) = 0 في ]0, 1[ هو:',
      questionMath: 'f(0) = -1, \\; f(1) = 1',
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f متصلة ورتيبة تماما (f\'(x) = 3x²+1 > 0) وتغير إشارتها بين 0 و1، إذن حل وحيد.',
      explanationMath: '\\exists! \\, \\alpha \\in \\,]0,1['
    },
    {
      id: 'tvi-q4',
      conceptId: 'mean-value-theorem',
      questionNumber: 4,
      questionText: 'اجتماع شرطي الاستمرارية والرتابة الصارمة على مجال [a, b] يضمن:',
      questionMath: 'f(a) \\cdot f(b) < 0',
      options: [
        { id: 'opt_1', text: 'عدم وجود أكثر من حل واحد للمعادلة f(x) = 0' },
        { id: 'opt_2', text: 'وجود حلين على الأقل للمعادلة' },
        { id: 'opt_3', text: 'استحالة وجود أي حل للمعادلة' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الرتابة الصارمة تمنع تكرار نفس القيمة، فتضمن وحدانية الحل إن وجد.',
      explanationMath: '\\exists! \\, \\alpha'
    },
    {
      id: 'tvi-q5',
      conceptId: 'mean-value-theorem',
      questionNumber: 5,
      questionText: 'لتكن g(x) = x³ + 2x - 5. إشارة g\'(x) = 3x² + 2 على ℝ هي:',
      questionMath: "g'(x) = 3x^2 + 2",
      options: [
        { id: 'opt_1', text: 'موجبة قطعاً دائماً' },
        { id: 'opt_2', text: 'سالبة قطعاً دائماً' },
        { id: 'opt_3', text: 'تتغير حسب إشارة x' }
      ],
      correctOptionId: 'opt_1',
      explanation: '3x² موجبة أو معدومة دائماً، فإضافة 2 تجعل المجموع موجباً قطعاً دائماً.',
      explanationMath: "g'(x) \\geq 2 > 0"
    },
    {
      id: 'tvi-q6',
      conceptId: 'mean-value-theorem',
      questionNumber: 6,
      questionText: 'لتكن h(x) = x³ - 3x + 5 على [-3, -2]، علماً أن h(-3) = -13 و h(-2) = 3 وأن h رتيبة تماما على هذا المجال. عدد حلول h(x) = 0 في ]-3, -2[ هو:',
      questionMath: 'h(-3) = -13, \\; h(-2) = 3',
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'h متصلة ورتيبة تماما على [-3,-2] وتغير إشارتها بين -13 و3، إذن حل وحيد.',
      explanationMath: '\\exists! \\, \\alpha \\in \\,]-3,-2['
    },
    {
      id: 'tvi-q7',
      conceptId: 'mean-value-theorem',
      questionNumber: 7,
      questionText: 'لإثبات وحدانية حل معادلة f(x) = 0 بمبرهنة القيم المتوسطة، يجب التأكد بالإضافة إلى الاتصال من:',
      questionMath: 'f(a) \\cdot f(b) < 0',
      options: [
        { id: 'opt_1', text: 'الرتابة الصارمة للدالة على المجال' },
        { id: 'opt_2', text: 'أن تكون الدالة زوجية' },
        { id: 'opt_3', text: 'أن تكون الدالة دورية' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الرتابة الصارمة (تزايد أو تناقص تام) هي ما يمنع تكرار القيمة صفر، فتضمن وحدانية الحل.',
      explanationMath: '\\text{رتابة صارمة} \\implies \\text{وحدانية الحل}'
    },
    {
      id: 'tvi-q8',
      conceptId: 'mean-value-theorem',
      questionNumber: 8,
      questionText: 'لتكن k(x) = -x³ - x + 3 على [1, 2]، علماً أن k(1) = 1 و k(2) = -7 وأن k متناقصة تماما. عدد حلول k(x) = 0 في ]1, 2[ هو:',
      questionMath: 'k(1) = 1, \\; k(2) = -7',
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'k متصلة ومتناقصة تماما وتغير إشارتها بين 1 و-7، إذن حل وحيد.',
      explanationMath: '\\exists! \\, \\alpha \\in \\,]1,2['
    },
    {
      id: 'tvi-q9',
      conceptId: 'mean-value-theorem',
      questionNumber: 9,
      questionText: 'إذا كان f(a) و f(b) لهما نفس الإشارة (f(a) · f(b) > 0)، فإن مبرهنة القيم المتوسطة بهذا الشكل:',
      questionMath: 'f(a) \\cdot f(b) > 0',
      options: [
        { id: 'opt_1', text: 'لا تسمح باستنتاج وجود حل مباشرة في ]a, b[' },
        { id: 'opt_2', text: 'تضمن عدم وجود أي حل في ]a, b[' },
        { id: 'opt_3', text: 'تضمن وجود حلين بالضبط في ]a, b[' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'شرط تغير الإشارة ضروري لتطبيق هذا الشكل من المبرهنة؛ بدونه لا يمكن الاستنتاج المباشر (قد يوجد عدد زوجي من الحلول أو لا يوجد).',
      explanationMath: '\\text{لا استنتاج مباشر}'
    },
    {
      id: 'tvi-q10',
      conceptId: 'mean-value-theorem',
      questionNumber: 10,
      questionText: 'لتكن m(x) = x³ + 4x - 2 على [0, 1]، علماً أن m(0) = -2 و m(1) = 3 وأن مشتقتها موجبة قطعاً (m\'(x) = 3x² + 4 > 0). عدد حلول m(x) = 0 في ]0, 1[ هو:',
      questionMath: "m'(x) = 3x^2 + 4",
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'm متزايدة تماما (المشتقة موجبة قطعاً) ومتصلة وتغير إشارتها بين -2 و3، إذن حل وحيد.',
      explanationMath: '\\exists! \\, \\alpha \\in \\,]0,1['
    }
  ],

  // 4. مشتق دالة مركبة
  'chain-rule': [
    {
      id: 'q1',
      conceptId: 'chain-rule',
      questionNumber: 1,
      questionText: 'ما هي مشتقة الدالة المعرفة بـ:',
      questionMath: 'f(x) = (2x + 1)^3',
      options: [
        { id: 'opt_1', text: '', mathTex: '3(2x + 1)^2' },
        { id: 'opt_2', text: '', mathTex: '6(2x + 1)^2' },
        { id: 'opt_3', text: '', mathTex: '2(2x + 1)^3' }
      ],
      correctOptionId: 'opt_2',
      explanation: 'بتطبيق قاعدة مشتق القوة ([u]^n)\' = n · u\' · u^(n-1): هنا u(x) = 2x + 1 إذن u\'(x) = 2. وبالتالي f\'(x) = 3 · 2 · (2x + 1)^2 = 6(2x + 1)^2.',
      explanationMath: 'f\'(x) = 3 \\times 2 \\times (2x+1)^2 = 6(2x+1)^2'
    },
    {
      id: 'q2',
      conceptId: 'chain-rule',
      questionNumber: 2,
      questionText: 'مشتقة الدالة الجذرية الآتية على ℝ هي:',
      questionMath: 'f(x) = \\sqrt{3x^2 + 4}',
      options: [
        { id: 'opt_1', text: '', mathTex: '\\frac{3x}{\\sqrt{3x^2 + 4}}' },
        { id: 'opt_2', text: '', mathTex: '\\frac{6x}{\\sqrt{3x^2 + 4}}' },
        { id: 'opt_3', text: '', mathTex: '\\frac{1}{2\\sqrt{3x^2 + 4}}' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'قاعدة مشتق الجذر التربيعي (√u)\' = u\' / (2√u). هنا u(x) = 3x^2 + 4 مشتقتها u\'(x) = 6x. بالتعويض: f\'(x) = 6x / (2√(3x^2+4)) = 3x / √(3x^2+4).',
      explanationMath: 'f\'(x) = \\frac{6x}{2\\sqrt{3x^2+4}} = \\frac{3x}{\\sqrt{3x^2+4}}'
    },
    {
      id: 'cr-q3',
      conceptId: 'chain-rule',
      questionNumber: 3,
      questionText: 'مشتقة الدالة f(x) = (x - 1)^5 هي:',
      questionMath: 'f(x) = (x-1)^5',
      options: [
        { id: 'opt_1', text: '', mathTex: '5(x-1)^4' },
        { id: 'opt_2', text: '', mathTex: '(x-1)^4' },
        { id: 'opt_3', text: '', mathTex: '5(x-1)^5' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'قاعدة ([u]^5)\' = 5 · u\' · u^4 حيث u(x) = x-1 و u\'(x) = 1.',
      explanationMath: "f'(x) = 5(x-1)^4"
    },
    {
      id: 'cr-q4',
      conceptId: 'chain-rule',
      questionNumber: 4,
      questionText: 'مشتقة الدالة f(x) = cos(3x) هي:',
      questionMath: 'f(x) = \\cos(3x)',
      options: [
        { id: 'opt_1', text: '', mathTex: '-3\\sin(3x)' },
        { id: 'opt_2', text: '', mathTex: '3\\sin(3x)' },
        { id: 'opt_3', text: '', mathTex: '-\\sin(3x)' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'قاعدة (cos(u))\' = -u\' sin(u) حيث u(x) = 3x.',
      explanationMath: "f'(x) = -3\\sin(3x)"
    },
    {
      id: 'cr-q5',
      conceptId: 'chain-rule',
      questionNumber: 5,
      questionText: 'مشتقة الدالة f(x) = e^(2x-1) هي:',
      questionMath: 'f(x) = e^{2x-1}',
      options: [
        { id: 'opt_1', text: '', mathTex: '2e^{2x-1}' },
        { id: 'opt_2', text: '', mathTex: 'e^{2x-1}' },
        { id: 'opt_3', text: '', mathTex: '2xe^{2x-1}' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'قاعدة (e^u)\' = u\' e^u حيث u(x) = 2x-1 و u\'(x) = 2.',
      explanationMath: "f'(x) = 2e^{2x-1}"
    },
    {
      id: 'cr-q6',
      conceptId: 'chain-rule',
      questionNumber: 6,
      questionText: 'مشتقة الدالة f(x) = (5x + 2)^4 هي:',
      questionMath: 'f(x) = (5x+2)^4',
      options: [
        { id: 'opt_1', text: '', mathTex: '20(5x+2)^3' },
        { id: 'opt_2', text: '', mathTex: '4(5x+2)^3' },
        { id: 'opt_3', text: '', mathTex: '5(5x+2)^3' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'قاعدة ([u]^4)\' = 4 · u\' · u^3 حيث u\'(x) = 5: 4 × 5 = 20.',
      explanationMath: "f'(x) = 20(5x+2)^3"
    },
    {
      id: 'cr-q7',
      conceptId: 'chain-rule',
      questionNumber: 7,
      questionText: 'مشتقة الدالة f(x) = √(4x - 1) هي:',
      questionMath: 'f(x) = \\sqrt{4x-1}',
      options: [
        { id: 'opt_1', text: '', mathTex: '\\frac{2}{\\sqrt{4x-1}}' },
        { id: 'opt_2', text: '', mathTex: '\\frac{4}{\\sqrt{4x-1}}' },
        { id: 'opt_3', text: '', mathTex: '\\frac{1}{\\sqrt{4x-1}}' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'قاعدة (√u)\' = u\'/(2√u) = 4/(2√(4x-1)) = 2/√(4x-1).',
      explanationMath: "f'(x) = \\frac{2}{\\sqrt{4x-1}}"
    },
    {
      id: 'cr-q8',
      conceptId: 'chain-rule',
      questionNumber: 8,
      questionText: 'مشتقة الدالة f(x) = sin(5x) هي:',
      questionMath: 'f(x) = \\sin(5x)',
      options: [
        { id: 'opt_1', text: '', mathTex: '5\\cos(5x)' },
        { id: 'opt_2', text: '', mathTex: '-5\\cos(5x)' },
        { id: 'opt_3', text: '', mathTex: '\\cos(5x)' }
      ],
      correctOptionId: 'opt_1',
      explanation: "(sin(u))' = u' cos(u) حيث u(x) = 5x.",
      explanationMath: "f'(x) = 5\\cos(5x)"
    },
    {
      id: 'cr-q9',
      conceptId: 'chain-rule',
      questionNumber: 9,
      questionText: 'مشتقة الدالة f(x) = (x² + 1)³ هي:',
      questionMath: 'f(x) = (x^2+1)^3',
      options: [
        { id: 'opt_1', text: '', mathTex: '6x(x^2+1)^2' },
        { id: 'opt_2', text: '', mathTex: '3x(x^2+1)^2' },
        { id: 'opt_3', text: '', mathTex: '6x(x^2+1)^3' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'قاعدة ([u]^3)\' = 3 · u\' · u^2 حيث u\'(x) = 2x: 3 × 2x = 6x.',
      explanationMath: "f'(x) = 6x(x^2+1)^2"
    },
    {
      id: 'cr-q10',
      conceptId: 'chain-rule',
      questionNumber: 10,
      questionText: 'مشتقة الدالة f(x) = 1/(2x+3) هي:',
      questionMath: 'f(x) = \\frac{1}{2x+3}',
      options: [
        { id: 'opt_1', text: '', mathTex: '\\frac{-2}{(2x+3)^2}' },
        { id: 'opt_2', text: '', mathTex: '\\frac{2}{(2x+3)^2}' },
        { id: 'opt_3', text: '', mathTex: '\\frac{-1}{(2x+3)^2}' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'بكتابة f(x) = (2x+3)^(-1) نطبق قاعدة السلسلة: -1 × 2 × (2x+3)^(-2) = -2/(2x+3)².',
      explanationMath: "f'(x) = \\frac{-2}{(2x+3)^2}"
    }
  ],

  // 9. الدالة الأسية: تعريف وخواص
  'exponential-definition-props': [
    {
      id: 'exp-q1',
      conceptId: 'exponential-definition-props',
      questionNumber: 1,
      questionText: 'ما هي قيمة e⁰؟',
      questionMath: 'e^0 = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: 'e' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'حسب تعريف الدالة الأسية فإن e⁰ = 1.',
      explanationMath: 'e^0 = 1'
    },
    {
      id: 'exp-q2',
      conceptId: 'exponential-definition-props',
      questionNumber: 2,
      questionText: 'من أجل كل عدد حقيقي x، فإن إشارة e^x تكون دائماً:',
      questionMath: 'e^x \\quad (\\forall x \\in \\mathbb{R})',
      options: [
        { id: 'opt_1', text: 'موجبة تماماً (> 0)', mathTex: 'e^x > 0' },
        { id: 'opt_2', text: 'موجبة أو معدومة (≥ 0)', mathTex: 'e^x \\ge 0' },
        { id: 'opt_3', text: 'حسب إشارة x', mathTex: '\\text{متغيرة}' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الدالة الأسية موجبة تماماً على ℝ ولا تنعدم أبداً.',
      explanationMath: '\\forall x \\in \\mathbb{R} : e^x > 0'
    },
    {
      id: 'exp-q3',
      conceptId: 'exponential-definition-props',
      questionNumber: 3,
      questionText: 'لتكن f(x) = e^x. قيمة f\'(0) هي:',
      questionMath: "f'(0) = ?",
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: 'e' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الدالة الأسية تحقق f\' = f، إذن f\'(0) = f(0) = e^0 = 1.',
      explanationMath: "f'(0) = 1"
    },
    {
      id: 'exp-q4',
      conceptId: 'exponential-definition-props',
      questionNumber: 4,
      questionText: 'إذا كتبنا e^(2x) × e^x على الشكل e^(ax)، فإن قيمة a هي:',
      questionMath: 'e^{2x} \\times e^{x} = e^{ax}',
      options: [
        { id: 'opt_1', text: '', mathTex: '3' },
        { id: 'opt_2', text: '', mathTex: '2' },
        { id: 'opt_3', text: '', mathTex: '1' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'e^(2x) × e^x = e^(2x+x) = e^(3x).',
      explanationMath: 'a = 3'
    },
    {
      id: 'exp-q5',
      conceptId: 'exponential-definition-props',
      questionNumber: 5,
      questionText: 'مجال تعريف الدالة الأسية exp هو:',
      questionMath: 'D_{exp} = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: '\\mathbb{R}' },
        { id: 'opt_2', text: '', mathTex: ']0,+\\infty[' },
        { id: 'opt_3', text: '', mathTex: '\\mathbb{R}^*' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الدالة الأسية معرفة على كامل مجموعة الأعداد الحقيقية ℝ.',
      explanationMath: 'D_{exp} = \\mathbb{R}'
    },
    {
      id: 'exp-q6',
      conceptId: 'exponential-definition-props',
      questionNumber: 6,
      questionText: 'العبارة e⁵/e² تساوي e مرفوعة إلى القوة:',
      questionMath: '\\frac{e^5}{e^2} = e^{?}',
      options: [
        { id: 'opt_1', text: '', mathTex: '3' },
        { id: 'opt_2', text: '', mathTex: '7' },
        { id: 'opt_3', text: '', mathTex: '10' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'خارج قسمة أسي بنفس الأساس: e^a/e^b = e^(a-b) = e^(5-2) = e³.',
      explanationMath: '\\frac{e^5}{e^2} = e^3'
    },
    {
      id: 'exp-q7',
      conceptId: 'exponential-definition-props',
      questionNumber: 7,
      questionText: 'العبارة (e^x)² تساوي e مرفوعة إلى:',
      questionMath: '(e^x)^2 = e^{?x}',
      options: [
        { id: 'opt_1', text: '', mathTex: '2x' },
        { id: 'opt_2', text: '', mathTex: 'x' },
        { id: 'opt_3', text: '', mathTex: '4x' }
      ],
      correctOptionId: 'opt_1',
      explanation: '(e^x)^n = e^(nx)، إذن (e^x)² = e^(2x).',
      explanationMath: '(e^x)^2 = e^{2x}'
    },
    {
      id: 'exp-q8',
      conceptId: 'exponential-definition-props',
      questionNumber: 8,
      questionText: 'نهاية e^x عندما x تؤول إلى -∞ هي:',
      questionMath: '\\lim_{x \\to -\\infty} e^x',
      options: [
        { id: 'opt_1', text: '', mathTex: '0' },
        { id: 'opt_2', text: '', mathTex: '+\\infty' },
        { id: 'opt_3', text: '', mathTex: '1' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'من النهايات المرجعية للدالة الأسية: نهايتها عند -∞ هي 0.',
      explanationMath: '\\lim_{x \\to -\\infty} e^x = 0'
    },
    {
      id: 'exp-q9',
      conceptId: 'exponential-definition-props',
      questionNumber: 9,
      questionText: 'نهاية e^x عندما x تؤول إلى +∞ هي:',
      questionMath: '\\lim_{x \\to +\\infty} e^x',
      options: [
        { id: 'opt_1', text: '', mathTex: '+\\infty' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '1' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'من النهايات المرجعية للدالة الأسية: نهايتها عند +∞ هي +∞.',
      explanationMath: '\\lim_{x \\to +\\infty} e^x = +\\infty'
    },
    {
      id: 'exp-q10',
      conceptId: 'exponential-definition-props',
      questionNumber: 10,
      questionText: 'مشتقة الدالة f(x) = 3e^x هي:',
      questionMath: 'f(x) = 3e^x',
      options: [
        { id: 'opt_1', text: '', mathTex: '3e^x' },
        { id: 'opt_2', text: '', mathTex: 'e^x' },
        { id: 'opt_3', text: '', mathTex: '3xe^x' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الثابت الضربي يبقى كما هو عند الاشتقاق، ومشتقة e^x هي e^x نفسها.',
      explanationMath: "f'(x) = 3e^x"
    }
  ],

  // 13. الدالة اللوغاريتمية
  'logarithm-definition-props': [
    {
      id: 'log-q1',
      conceptId: 'logarithm-definition-props',
      questionNumber: 1,
      questionText: 'مجموعة تعريف الدالة اللوغاريتمية النيبيرية ln(x) هي:',
      questionMath: 'D_{\\ln} = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: ']0, +\\infty[' },
        { id: 'opt_2', text: '', mathTex: '[0, +\\infty[' },
        { id: 'opt_3', text: '', mathTex: '\\mathbb{R}' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'اللوغاريتم معرف فقط على الأعداد الحقيقية الموجبة تماماً ]0, +∞[.',
      explanationMath: 'D = ]0, +\\infty['
    },
    {
      id: 'log-q2',
      conceptId: 'logarithm-definition-props',
      questionNumber: 2,
      questionText: 'العبارة ln(e³) تساوي:',
      questionMath: '\\ln(e^3) = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: '3' },
        { id: 'opt_2', text: '', mathTex: 'e^3' },
        { id: 'opt_3', text: '', mathTex: '1/3' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'خاصية اللوغاريتم والأسية: ln(e^x) = x لكل x ∈ ℝ، ومنه ln(e³) = 3.',
      explanationMath: '\\ln(e^3) = 3'
    },
    {
      id: 'log-q3',
      conceptId: 'logarithm-definition-props',
      questionNumber: 3,
      questionText: 'قيمة ln(1) هي:',
      questionMath: '\\ln(1) = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: '0' },
        { id: 'opt_2', text: '', mathTex: '1' },
        { id: 'opt_3', text: '', mathTex: 'e' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'من خواص اللوغاريتم النيبيري الأساسية: ln(1) = 0.',
      explanationMath: '\\ln(1) = 0'
    },
    {
      id: 'log-q4',
      conceptId: 'logarithm-definition-props',
      questionNumber: 4,
      questionText: 'إذا كتبنا ln(8) - ln(2) على الشكل a·ln(2)، فإن قيمة a هي:',
      questionMath: '\\ln(8) - \\ln(2) = a\\ln(2)',
      options: [
        { id: 'opt_1', text: '', mathTex: '2' },
        { id: 'opt_2', text: '', mathTex: '4' },
        { id: 'opt_3', text: '', mathTex: '1' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'ln(8) - ln(2) = ln(4) = ln(2²) = 2ln(2).',
      explanationMath: 'a = 2'
    },
    {
      id: 'log-q5',
      conceptId: 'logarithm-definition-props',
      questionNumber: 5,
      questionText: 'مجال تعريف الدالة اللوغاريتمية ln هو:',
      questionMath: 'D_{\\ln} = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: ']0,+\\infty[' },
        { id: 'opt_2', text: '', mathTex: '\\mathbb{R}' },
        { id: 'opt_3', text: '', mathTex: '\\mathbb{R}^*' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'اللوغاريتم النيبيري معرف فقط على الأعداد الحقيقية الموجبة قطعاً.',
      explanationMath: 'D = ]0,+\\infty['
    },
    {
      id: 'log-q6',
      conceptId: 'logarithm-definition-props',
      questionNumber: 6,
      questionText: 'قيمة ln(e⁵) هي:',
      questionMath: '\\ln(e^5) = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: '5' },
        { id: 'opt_2', text: '', mathTex: 'e^5' },
        { id: 'opt_3', text: '', mathTex: '1/5' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'خاصية ln(e^n) = n لكل عدد حقيقي n.',
      explanationMath: '\\ln(e^5) = 5'
    },
    {
      id: 'log-q7',
      conceptId: 'logarithm-definition-props',
      questionNumber: 7,
      questionText: 'من أجل a, b > 0، العبارة ln(a × b) تساوي:',
      questionMath: '\\ln(a \\times b) = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: '\\ln(a) + \\ln(b)' },
        { id: 'opt_2', text: '', mathTex: '\\ln(a) \\times \\ln(b)' },
        { id: 'opt_3', text: '', mathTex: '\\ln(a) - \\ln(b)' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'من الخواص الأساسية للوغاريتم: لوغاريتم الجداء يساوي مجموع اللوغاريتمين.',
      explanationMath: '\\ln(ab) = \\ln(a) + \\ln(b)'
    },
    {
      id: 'log-q8',
      conceptId: 'logarithm-definition-props',
      questionNumber: 8,
      questionText: 'من أجل a > 0، العبارة ln(1/a) تساوي:',
      questionMath: '\\ln\\left(\\frac{1}{a}\\right) = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: '-\\ln(a)' },
        { id: 'opt_2', text: '', mathTex: '\\ln(a)' },
        { id: 'opt_3', text: '', mathTex: '\\frac{1}{\\ln(a)}' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'ln(1/a) = ln(1) - ln(a) = 0 - ln(a) = -ln(a).',
      explanationMath: '\\ln(1/a) = -\\ln(a)'
    },
    {
      id: 'log-q9',
      conceptId: 'logarithm-definition-props',
      questionNumber: 9,
      questionText: 'نهاية ln(x) عندما x تؤول إلى 0⁺ هي:',
      questionMath: '\\lim_{x \\to 0^+} \\ln(x)',
      options: [
        { id: 'opt_1', text: '', mathTex: '-\\infty' },
        { id: 'opt_2', text: '', mathTex: '+\\infty' },
        { id: 'opt_3', text: '', mathTex: '0' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'من النهايات المرجعية: نهاية ln(x) عند 0⁺ هي -∞.',
      explanationMath: '\\lim_{x \\to 0^+} \\ln(x) = -\\infty'
    },
    {
      id: 'log-q10',
      conceptId: 'logarithm-definition-props',
      questionNumber: 10,
      questionText: 'نهاية ln(x) عندما x تؤول إلى +∞ هي:',
      questionMath: '\\lim_{x \\to +\\infty} \\ln(x)',
      options: [
        { id: 'opt_1', text: '', mathTex: '+\\infty' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '-\\infty' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'من النهايات المرجعية: نهاية ln(x) عند +∞ هي +∞.',
      explanationMath: '\\lim_{x \\to +\\infty} \\ln(x) = +\\infty'
    }
  ],

  // 17. حساب النهايات
  'limits-infinite-asymptotes': [
    {
      id: 'lim-q1',
      conceptId: 'limits-infinite-asymptotes',
      questionNumber: 1,
      questionText: 'إذا كانت lim_{x -> 2} f(x) = +∞، فإن المنحنى (C_f) يقبل مستقيماً مقارباً معادلته:',
      questionMath: '\\lim_{x \\to 2} f(x) = +\\infty',
      options: [
        { id: 'opt_1', text: 'عمودياً معادلته x = 2', mathTex: 'x = 2' },
        { id: 'opt_2', text: 'أفقياً معادلته y = 2', mathTex: 'y = 2' },
        { id: 'opt_3', text: 'مائلاً معادلته y = 2x', mathTex: 'y = 2x' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'النهاية غير منتهية عند نقطة منتهية x₀ = 2 تعني وجود مستقيم مقارب عمودي موازي لمحور التراتيب معادلته x = 2.',
      explanationMath: 'x = 2 \\quad (\\text{مقارب عمودي})'
    },
    {
      id: 'lim-q2',
      conceptId: 'limits-infinite-asymptotes',
      questionNumber: 2,
      questionText: 'نهاية الدالة f(x) = (2x+1)/(x-3) عندما x تؤول إلى +∞ هي:',
      questionMath: '\\lim_{x \\to +\\infty} \\frac{2x+1}{x-3}',
      options: [
        { id: 'opt_1', text: '', mathTex: '2' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '+\\infty' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'بقسمة البسط والمقام على x نحصل على النهاية 2/1 = 2.',
      explanationMath: '\\lim = 2'
    },
    {
      id: 'lim-q3',
      conceptId: 'limits-infinite-asymptotes',
      questionNumber: 3,
      questionText: 'للدالة f(x) = 1/(x-2)، فاصلة المستقيم المقارب العمودي هي:',
      questionMath: 'f(x) = \\frac{1}{x-2}',
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = 2' },
        { id: 'opt_2', text: '', mathTex: 'x = 0' },
        { id: 'opt_3', text: '', mathTex: 'x = 1' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'المقام ينعدم عند x = 2، وهي فاصلة المستقيم المقارب العمودي.',
      explanationMath: 'x = 2'
    },
    {
      id: 'lim-q4',
      conceptId: 'limits-infinite-asymptotes',
      questionNumber: 4,
      questionText: 'نهاية الدالة 1/(x-2) عندما x تؤول إلى +∞ هي:',
      questionMath: '\\lim_{x \\to +\\infty} \\frac{1}{x-2}',
      options: [
        { id: 'opt_1', text: '', mathTex: '0' },
        { id: 'opt_2', text: '', mathTex: '+\\infty' },
        { id: 'opt_3', text: '', mathTex: '2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'كلما كبرت x يصغر مقلوب المقام، فتؤول الدالة إلى 0.',
      explanationMath: '\\lim = 0'
    },
    {
      id: 'lim-q5',
      conceptId: 'limits-infinite-asymptotes',
      questionNumber: 5,
      questionText: 'نهاية الدالة 3x² عندما x تؤول إلى +∞ هي:',
      questionMath: '\\lim_{x \\to +\\infty} 3x^2',
      options: [
        { id: 'opt_1', text: '', mathTex: '+\\infty' },
        { id: 'opt_2', text: '', mathTex: '-\\infty' },
        { id: 'opt_3', text: '', mathTex: '0' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'حد كثير حدود ذو درجة زوجية ومعامل موجب يؤول إلى +∞ عند +∞.',
      explanationMath: '\\lim = +\\infty'
    },
    {
      id: 'lim-q6',
      conceptId: 'limits-infinite-asymptotes',
      questionNumber: 6,
      questionText: 'نهاية الدالة (3x-2)/(2x+1) عندما x تؤول إلى +∞ هي:',
      questionMath: '\\lim_{x \\to +\\infty} \\frac{3x-2}{2x+1}',
      options: [
        { id: 'opt_1', text: '', mathTex: '\\frac{3}{2}' },
        { id: 'opt_2', text: '', mathTex: '3' },
        { id: 'opt_3', text: '', mathTex: '2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'بقسمة البسط والمقام على x نحصل على النهاية 3/2.',
      explanationMath: '\\lim = \\frac{3}{2}'
    },
    {
      id: 'lim-q7',
      conceptId: 'limits-infinite-asymptotes',
      questionNumber: 7,
      questionText: 'معادلة المستقيم المقارب الأفقي لنفس الدالة (3x-2)/(2x+1) عند +∞ هي:',
      questionMath: 'y = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: 'y = \\frac{3}{2}' },
        { id: 'opt_2', text: '', mathTex: 'y = 3' },
        { id: 'opt_3', text: '', mathTex: 'x = \\frac{3}{2}' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'بما أن نهاية الدالة عند +∞ هي 3/2، فمعادلة المستقيم المقارب الأفقي هي y = 3/2.',
      explanationMath: 'y = \\frac{3}{2}'
    },
    {
      id: 'lim-q8',
      conceptId: 'limits-infinite-asymptotes',
      questionNumber: 8,
      questionText: 'نهاية الدالة 5/(x+1) عندما x تؤول إلى -∞ هي:',
      questionMath: '\\lim_{x \\to -\\infty} \\frac{5}{x+1}',
      options: [
        { id: 'opt_1', text: '', mathTex: '0' },
        { id: 'opt_2', text: '', mathTex: '-\\infty' },
        { id: 'opt_3', text: '', mathTex: '5' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'كلما صغرت x (تؤول إلى -∞) يصغر مقلوب المقام مطلقاً، فتؤول الدالة إلى 0.',
      explanationMath: '\\lim = 0'
    },
    {
      id: 'lim-q9',
      conceptId: 'limits-infinite-asymptotes',
      questionNumber: 9,
      questionText: 'للدالة f(x) = 2/(x+3)، فاصلة المستقيم المقارب العمودي هي:',
      questionMath: 'f(x) = \\frac{2}{x+3}',
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = -3' },
        { id: 'opt_2', text: '', mathTex: 'x = 3' },
        { id: 'opt_3', text: '', mathTex: 'x = 0' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'المقام ينعدم عند x = -3.',
      explanationMath: 'x = -3'
    },
    {
      id: 'lim-q10',
      conceptId: 'limits-infinite-asymptotes',
      questionNumber: 10,
      questionText: 'نهاية الدالة -2x³ عندما x تؤول إلى +∞ هي:',
      questionMath: '\\lim_{x \\to +\\infty} -2x^3',
      options: [
        { id: 'opt_1', text: '', mathTex: '-\\infty' },
        { id: 'opt_2', text: '', mathTex: '+\\infty' },
        { id: 'opt_3', text: '', mathTex: '0' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'حد كثير حدود ذو درجة فردية ومعامل سالب يؤول إلى -∞ عند +∞.',
      explanationMath: '\\lim = -\\infty'
    }
  ],

  // 20. المقارب المائل
  'asymptotic-behavior-oblique': [
    {
      id: 'obl-q1',
      conceptId: 'asymptotic-behavior-oblique',
      questionNumber: 1,
      questionText: 'الشرط اللازم والكافي ليكون المستقيم (Δ): y = ax + b مقارباً مائلاً لـ (C_f) عند +∞ هو:',
      questionMath: '(\\Delta) : y = ax + b',
      options: [
        { id: 'opt_1', text: '', mathTex: '\\lim_{x \\to +\\infty} [f(x) - (ax + b)] = 0' },
        { id: 'opt_2', text: '', mathTex: '\\lim_{x \\to +\\infty} f(x) = ax + b' },
        { id: 'opt_3', text: '', mathTex: 'f\'(x) = a' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'يكون المستقيم y = ax + b مقارباً مائلاً إذا وفقط إذا كانت نهاية الفرق f(x) - (ax + b) تؤول إلى الصفر عند اللانهاية.',
      explanationMath: '\\lim_{x \\to +\\infty} [f(x) - (ax+b)] = 0'
    },
    {
      id: 'obl-q2',
      conceptId: 'asymptotic-behavior-oblique',
      questionNumber: 2,
      questionText: 'لتكن f(x) = (x²+3x+2)/x = x + 3 + 2/x. معامل الميل a للمستقيم المقارب المائل عند +∞ هو:',
      questionMath: 'f(x) = x + 3 + \\frac{2}{x}',
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '2' },
        { id: 'opt_3', text: '', mathTex: '3' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الجزء الخطي في الكتابة x + 3 + 2/x هو x، فمعامل الميل a = 1.',
      explanationMath: 'a = 1'
    },
    {
      id: 'obl-q3',
      conceptId: 'asymptotic-behavior-oblique',
      questionNumber: 3,
      questionText: 'الحد الثابت b لنفس الدالة f(x) = x + 3 + 2/x هو:',
      questionMath: 'f(x) = x + 3 + \\frac{2}{x}',
      options: [
        { id: 'opt_1', text: '', mathTex: '3' },
        { id: 'opt_2', text: '', mathTex: '1' },
        { id: 'opt_3', text: '', mathTex: '2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الحد الثابت في الكتابة x + 3 + 2/x هو 3.',
      explanationMath: 'b = 3'
    },
    {
      id: 'obl-q4',
      conceptId: 'asymptotic-behavior-oblique',
      questionNumber: 4,
      questionText: 'معادلة المستقيم المقارب المائل لنفس الدالة عند +∞ هي:',
      questionMath: '(\\Delta) : y = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: 'y = x + 3' },
        { id: 'opt_2', text: '', mathTex: 'y = x + 2' },
        { id: 'opt_3', text: '', mathTex: 'y = 2x + 3' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'بما أن a = 1 و b = 3، فمعادلة المستقيم المقارب المائل هي y = x + 3.',
      explanationMath: 'y = x + 3'
    },
    {
      id: 'obl-q5',
      conceptId: 'asymptotic-behavior-oblique',
      questionNumber: 5,
      questionText: 'نهاية الحد المتبقي 2/x عندما x تؤول إلى +∞ هي:',
      questionMath: '\\lim_{x \\to +\\infty} \\frac{2}{x}',
      options: [
        { id: 'opt_1', text: '', mathTex: '0' },
        { id: 'opt_2', text: '', mathTex: '2' },
        { id: 'opt_3', text: '', mathTex: '+\\infty' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'كلما كبرت x يصغر 2/x ويؤول إلى 0.',
      explanationMath: '\\lim = 0'
    },
    {
      id: 'obl-q6',
      conceptId: 'asymptotic-behavior-oblique',
      questionNumber: 6,
      questionText: 'لتكن f(x) = (x²-2x+3)/x = x - 2 + 3/x. معامل الميل a للمستقيم المقارب المائل عند +∞ هو:',
      questionMath: 'f(x) = x - 2 + \\frac{3}{x}',
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '-2' },
        { id: 'opt_3', text: '', mathTex: '3' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الجزء الخطي في الكتابة x - 2 + 3/x هو x، فمعامل الميل a = 1.',
      explanationMath: 'a = 1'
    },
    {
      id: 'obl-q7',
      conceptId: 'asymptotic-behavior-oblique',
      questionNumber: 7,
      questionText: 'الحد الثابت b لنفس الدالة f(x) = x - 2 + 3/x هو:',
      questionMath: 'f(x) = x - 2 + \\frac{3}{x}',
      options: [
        { id: 'opt_1', text: '', mathTex: '-2' },
        { id: 'opt_2', text: '', mathTex: '1' },
        { id: 'opt_3', text: '', mathTex: '3' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الحد الثابت في الكتابة x - 2 + 3/x هو -2.',
      explanationMath: 'b = -2'
    },
    {
      id: 'obl-q8',
      conceptId: 'asymptotic-behavior-oblique',
      questionNumber: 8,
      questionText: 'معادلة المستقيم المقارب المائل لنفس الدالة عند +∞ هي:',
      questionMath: '(\\Delta) : y = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: 'y = x - 2' },
        { id: 'opt_2', text: '', mathTex: 'y = x + 2' },
        { id: 'opt_3', text: '', mathTex: 'y = -2x + 3' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'بما أن a = 1 و b = -2، فمعادلة المستقيم المقارب المائل هي y = x - 2.',
      explanationMath: 'y = x - 2'
    },
    {
      id: 'obl-q9',
      conceptId: 'asymptotic-behavior-oblique',
      questionNumber: 9,
      questionText: 'نهاية الحد المتبقي 3/x عندما x تؤول إلى +∞ هي:',
      questionMath: '\\lim_{x \\to +\\infty} \\frac{3}{x}',
      options: [
        { id: 'opt_1', text: '', mathTex: '0' },
        { id: 'opt_2', text: '', mathTex: '3' },
        { id: 'opt_3', text: '', mathTex: '+\\infty' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'كلما كبرت x يصغر 3/x ويؤول إلى 0.',
      explanationMath: '\\lim = 0'
    },
    {
      id: 'obl-q10',
      conceptId: 'asymptotic-behavior-oblique',
      questionNumber: 10,
      questionText: 'الفرق بين المستقيم المقارب الأفقي والمستقيم المقارب المائل هو أن الأفقي معامل ميله:',
      questionMath: 'y = ax + b',
      options: [
        { id: 'opt_1', text: 'معدوم (a = 0)' },
        { id: 'opt_2', text: 'موجب دائماً' },
        { id: 'opt_3', text: 'سالب دائماً' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'المستقيم المقارب الأفقي هو حالة خاصة من المائل عندما يكون معامل الميل a = 0.',
      explanationMath: 'a = 0'
    }
  ],

  // 5. خواص دالة والمنحنى الممثل لها (1)
  'function-properties-tangents': [
    {
      id: 'fpt-q1',
      conceptId: 'function-properties-tangents',
      questionNumber: 1,
      questionText: 'مشتقة الدالة f(x) = x³ - 3x هي:',
      questionMath: 'f(x) = x^3 - 3x',
      options: [
        { id: 'opt_1', text: '', mathTex: '3x^2 - 3' },
        { id: 'opt_2', text: '', mathTex: '3x^2 - 3x' },
        { id: 'opt_3', text: '', mathTex: 'x^2 - 3' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'نشتق كل حد: مشتق x³ هو 3x²، ومشتق -3x هو -3.',
      explanationMath: "f'(x) = 3x^2 - 3"
    },
    {
      id: 'fpt-q2',
      conceptId: 'function-properties-tangents',
      questionNumber: 2,
      questionText: 'القيم التي يكون عندها المماس أفقياً لنفس الدالة f(x) = x³ - 3x هي:',
      questionMath: "f'(x) = 0",
      options: [
        { id: 'opt_1', text: 'x = 1 و x = -1' },
        { id: 'opt_2', text: 'x = 0 فقط' },
        { id: 'opt_3', text: 'x = 3 فقط' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f\'(x) = 3(x-1)(x+1) = 0 عند x = 1 أو x = -1.',
      explanationMath: 'x = \\pm 1'
    },
    {
      id: 'fpt-q3',
      conceptId: 'function-properties-tangents',
      questionNumber: 3,
      questionText: 'القيمة f(-1) = 2 لنفس الدالة تمثل:',
      questionMath: 'f(-1) = 2',
      options: [
        { id: 'opt_1', text: 'قيمة عظمى محلية' },
        { id: 'opt_2', text: 'قيمة صغرى محلية' },
        { id: 'opt_3', text: 'نقطة انعطاف' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f\' تتغير من الموجب إلى السالب عند x = -1، إذن f تقبل قيمة عظمى محلية هناك.',
      explanationMath: '\\text{max local}'
    },
    {
      id: 'fpt-q4',
      conceptId: 'function-properties-tangents',
      questionNumber: 4,
      questionText: 'إذا كانت f\'(x) > 0 على مجال ما، فإن الدالة f تكون على هذا المجال:',
      questionMath: "f'(x) > 0",
      options: [
        { id: 'opt_1', text: 'متزايدة تماما' },
        { id: 'opt_2', text: 'متناقصة تماما' },
        { id: 'opt_3', text: 'ثابتة' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'إشارة المشتقة الموجبة تعني أن الدالة متزايدة تماما على ذلك المجال.',
      explanationMath: "f' > 0 \\implies f \\nearrow"
    },
    {
      id: 'fpt-q5',
      conceptId: 'function-properties-tangents',
      questionNumber: 5,
      questionText: 'معامل توجيه المماس لمنحنى دالة عند نقطة يساوي:',
      questionMath: '(T) : ?',
      options: [
        { id: 'opt_1', text: 'العدد المشتق للدالة عند تلك النقطة' },
        { id: 'opt_2', text: 'قيمة الدالة عند تلك النقطة' },
        { id: 'opt_3', text: 'صفر دائماً' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'معامل توجيه المماس عند نقطة يساوي بالتعريف العدد المشتق عند تلك النقطة.',
      explanationMath: "a = f'(x_0)"
    },
    {
      id: 'fpt-q6',
      conceptId: 'function-properties-tangents',
      questionNumber: 6,
      questionText: 'مشتقة الدالة f(x) = 2x³ - 6x هي:',
      questionMath: 'f(x) = 2x^3 - 6x',
      options: [
        { id: 'opt_1', text: '', mathTex: '6x^2 - 6' },
        { id: 'opt_2', text: '', mathTex: '6x^2 - 6x' },
        { id: 'opt_3', text: '', mathTex: '2x^2 - 6' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'نشتق كل حد: مشتق 2x³ هو 6x²، ومشتق -6x هو -6.',
      explanationMath: "f'(x) = 6x^2 - 6"
    },
    {
      id: 'fpt-q7',
      conceptId: 'function-properties-tangents',
      questionNumber: 7,
      questionText: 'القيم التي تنعدم عندها مشتقة نفس الدالة f(x) = 2x³ - 6x هي:',
      questionMath: "f'(x) = 0",
      options: [
        { id: 'opt_1', text: 'x = 1 و x = -1' },
        { id: 'opt_2', text: 'x = 0 فقط' },
        { id: 'opt_3', text: 'x = 2 فقط' }
      ],
      correctOptionId: 'opt_1',
      explanation: '6x² - 6 = 0 يكافئ x² = 1، إذن x = 1 أو x = -1.',
      explanationMath: 'x = \\pm 1'
    },
    {
      id: 'fpt-q8',
      conceptId: 'function-properties-tangents',
      questionNumber: 8,
      questionText: 'إذا كانت f\'(x) تتغير من السالب إلى الموجب عند x₀، فإن f تقبل عند x₀:',
      questionMath: "f'(x_0^-) < 0, \\; f'(x_0^+) > 0",
      options: [
        { id: 'opt_1', text: 'قيمة صغرى محلية' },
        { id: 'opt_2', text: 'قيمة عظمى محلية' },
        { id: 'opt_3', text: 'نقطة انعطاف' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'تغير إشارة المشتقة من السالب إلى الموجب يدل على قيمة صغرى محلية.',
      explanationMath: '\\text{min local}'
    },
    {
      id: 'fpt-q9',
      conceptId: 'function-properties-tangents',
      questionNumber: 9,
      questionText: 'إذا كانت f\'(x) < 0 على مجال ما، فإن الدالة f تكون على هذا المجال:',
      questionMath: "f'(x) < 0",
      options: [
        { id: 'opt_1', text: 'متناقصة تماما' },
        { id: 'opt_2', text: 'متزايدة تماما' },
        { id: 'opt_3', text: 'ثابتة' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'إشارة المشتقة السالبة تعني أن الدالة متناقصة تماما على ذلك المجال.',
      explanationMath: "f' < 0 \\implies f \\searrow"
    },
    {
      id: 'fpt-q10',
      conceptId: 'function-properties-tangents',
      questionNumber: 10,
      questionText: 'عدد نقاط المماس الأفقي لمنحنى دالة يساوي عدد:',
      questionMath: "f'(x) = 0",
      options: [
        { id: 'opt_1', text: 'حلول المعادلة f\'(x) = 0' },
        { id: 'opt_2', text: 'حلول المعادلة f(x) = 0' },
        { id: 'opt_3', text: 'حلول المعادلة f\'\'(x) = 0' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'المماس أفقي عندما ينعدم معامل توجيهه، أي عند حلول f\'(x) = 0.',
      explanationMath: "f'(x) = 0"
    }
  ],

  // 6. خواص دالة والمنحنى الممثل لها (2)
  'function-variation-inflection': [
    {
      id: 'fvi-q1',
      conceptId: 'function-variation-inflection',
      questionNumber: 1,
      questionText: 'نقطة الانعطاف لمنحنى دالة هي النقطة التي:',
      questionMath: "f''(x) = 0",
      options: [
        { id: 'opt_1', text: 'تتغير عندها إشارة المشتقة الثانية' },
        { id: 'opt_2', text: 'تنعدم عندها المشتقة الأولى فقط' },
        { id: 'opt_3', text: 'تكون الدالة غير متصلة عندها' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'نقطة الانعطاف هي النقطة التي يتغير عندها تقعر المنحنى، أي تتغير عندها إشارة المشتقة الثانية.',
      explanationMath: "f''(x_0) = 0 \\text{ مع تغير الإشارة}"
    },
    {
      id: 'fvi-q2',
      conceptId: 'function-variation-inflection',
      questionNumber: 2,
      questionText: 'المشتقة الثانية للدالة f(x) = x³ - 3x² + 2 هي:',
      questionMath: "f''(x) = ?",
      options: [
        { id: 'opt_1', text: '', mathTex: '6x - 6' },
        { id: 'opt_2', text: '', mathTex: '3x^2 - 6x' },
        { id: 'opt_3', text: '', mathTex: '6x' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f\'(x) = 3x² - 6x، ثم f\'\'(x) = 6x - 6.',
      explanationMath: "f''(x) = 6x - 6"
    },
    {
      id: 'fvi-q3',
      conceptId: 'function-variation-inflection',
      questionNumber: 3,
      questionText: 'فاصلة نقطة انعطاف نفس الدالة f(x) = x³ - 3x² + 2 هي:',
      questionMath: "f''(x) = 0",
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f\'\'(x) = 6x - 6 تنعدم وتغير إشارتها عند x = 1.',
      explanationMath: 'x = 1'
    },
    {
      id: 'fvi-q4',
      conceptId: 'function-variation-inflection',
      questionNumber: 4,
      questionText: 'لتكن g(x) = x⁴ - 6x² + 1. عدد نقاط انعطاف منحناها على ℝ هو:',
      questionMath: "g''(x) = 12x^2 - 12",
      options: [
        { id: 'opt_1', text: '', mathTex: '2' },
        { id: 'opt_2', text: '', mathTex: '1' },
        { id: 'opt_3', text: '', mathTex: '0' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'g\'\'(x) = 12(x-1)(x+1) تتغير إشارتها عند x = 1 و x = -1، إذن نقطتا انعطاف.',
      explanationMath: 'x = \\pm 1'
    },
    {
      id: 'fvi-q5',
      conceptId: 'function-variation-inflection',
      questionNumber: 5,
      questionText: 'عدد نقاط الانعطاف الممكنة لمنحنى دالة كثيرة حدود من الدرجة الثالثة هو على الأكثر:',
      questionMath: '\\deg(f) = 3',
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '2' },
        { id: 'opt_3', text: '', mathTex: '3' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'المشتقة الثانية لكثير حدود من الدرجة الثالثة تآلفية، فلا تنعدم وتغير إشارتها إلا مرة واحدة على الأكثر.',
      explanationMath: '\\text{عدد نقاط الانعطاف} \\leq 1'
    },
    {
      id: 'fvi-q6',
      conceptId: 'function-variation-inflection',
      questionNumber: 6,
      questionText: 'المشتقة الثانية للدالة f(x) = 2x³ - 3x² هي:',
      questionMath: "f''(x) = ?",
      options: [
        { id: 'opt_1', text: '', mathTex: '12x - 6' },
        { id: 'opt_2', text: '', mathTex: '6x^2 - 6x' },
        { id: 'opt_3', text: '', mathTex: '12x' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f\'(x) = 6x² - 6x، ثم f\'\'(x) = 12x - 6.',
      explanationMath: "f''(x) = 12x - 6"
    },
    {
      id: 'fvi-q7',
      conceptId: 'function-variation-inflection',
      questionNumber: 7,
      questionText: 'فاصلة نقطة انعطاف نفس الدالة f(x) = 2x³ - 3x² هي:',
      questionMath: "f''(x) = 0",
      options: [
        { id: 'opt_1', text: '', mathTex: '1/2' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '1' }
      ],
      correctOptionId: 'opt_1',
      explanation: '12x - 6 = 0 يكافئ x = 1/2.',
      explanationMath: 'x = \\frac{1}{2}'
    },
    {
      id: 'fvi-q8',
      conceptId: 'function-variation-inflection',
      questionNumber: 8,
      questionText: 'عند نقطة الانعطاف، تتغير إشارة:',
      questionMath: "f''(x_0) = 0",
      options: [
        { id: 'opt_1', text: 'المشتقة الثانية f\'\'(x)' },
        { id: 'opt_2', text: 'المشتقة الأولى f\'(x) دائماً' },
        { id: 'opt_3', text: 'الدالة نفسها f(x)' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'نقطة الانعطاف تحدد بتغير إشارة المشتقة الثانية تحديداً.',
      explanationMath: "f''(x) \\text{ تغير الإشارة}"
    },
    {
      id: 'fvi-q9',
      conceptId: 'function-variation-inflection',
      questionNumber: 9,
      questionText: 'إذا كانت f\'\'(x) > 0 على مجال، فإن مماسات المنحنى على هذا المجال تكون:',
      questionMath: "f''(x) > 0",
      options: [
        { id: 'opt_1', text: 'تحت المنحنى' },
        { id: 'opt_2', text: 'فوق المنحنى' },
        { id: 'opt_3', text: 'متطابقة مع المنحنى' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'عندما تكون f\'\'(x) > 0، يكون المنحنى محدباً (تقعره نحو الأعلى) وتقع مماساته تحته.',
      explanationMath: "f'' > 0"
    },
    {
      id: 'fvi-q10',
      conceptId: 'function-variation-inflection',
      questionNumber: 10,
      questionText: 'كثير حدود من الدرجة الرابعة يمكن أن يملك منحناه على الأكثر:',
      questionMath: '\\deg(f) = 4',
      options: [
        { id: 'opt_1', text: 'نقطتي انعطاف' },
        { id: 'opt_2', text: 'نقطة انعطاف واحدة فقط' },
        { id: 'opt_3', text: 'ثلاث نقاط انعطاف' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'المشتقة الثانية لكثير حدود من الدرجة الرابعة من الدرجة الثانية، فلها جذران على الأكثر.',
      explanationMath: '\\text{عدد نقاط الانعطاف} \\leq 2'
    }
  ],

  // 7. توظيف المشتقات لحل مشكلات
  'problem-solving-derivatives': [
    {
      id: 'psd-q1',
      conceptId: 'problem-solving-derivatives',
      questionNumber: 1,
      questionText: 'لتكن f(x) = (x² + 1) / x على ]0, +∞[. القيمة الدنيا للدالة f هي:',
      questionMath: 'f(x) = \\frac{x^2+1}{x}',
      options: [
        { id: 'opt_1', text: '', mathTex: '2' },
        { id: 'opt_2', text: '', mathTex: '1' },
        { id: 'opt_3', text: '', mathTex: '0' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f\'(x) = (x²-1)/x² تنعدم وتتغير إشارتها عند x=1، وهناك f(1) = 2 هي القيمة الدنيا.',
      explanationMath: 'f(1) = 2'
    },
    {
      id: 'psd-q2',
      conceptId: 'problem-solving-derivatives',
      questionNumber: 2,
      questionText: 'تتحقق القيمة الدنيا لنفس الدالة عند:',
      questionMath: "f'(x) = 0",
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = 1' },
        { id: 'opt_2', text: '', mathTex: 'x = 0' },
        { id: 'opt_3', text: '', mathTex: 'x = 2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'المشتقة تنعدم عند x = 1، وهي القيمة الوحيدة في ]0,+∞[ التي تحقق ذلك.',
      explanationMath: 'x = 1'
    },
    {
      id: 'psd-q3',
      conceptId: 'problem-solving-derivatives',
      questionNumber: 3,
      questionText: 'لمستطيل محيطه 20 سم، المساحة القصوى الممكنة له هي:',
      questionMath: 'A(x) = x(10-x)',
      options: [
        { id: 'opt_1', text: '', mathTex: '25' },
        { id: 'opt_2', text: '', mathTex: '20' },
        { id: 'opt_3', text: '', mathTex: '50' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'A(x) = x(10-x) تبلغ أقصاها عند x = 5 وتساوي A(5) = 25 سم².',
      explanationMath: 'A(5) = 25'
    },
    {
      id: 'psd-q4',
      conceptId: 'problem-solving-derivatives',
      questionNumber: 4,
      questionText: 'القيمة التي تعطي المساحة القصوى في نفس المسألة هي:',
      questionMath: "A'(x) = 10 - 2x",
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = 5' },
        { id: 'opt_2', text: '', mathTex: 'x = 10' },
        { id: 'opt_3', text: '', mathTex: 'x = 2.5' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'A\'(x) = 10 - 2x تنعدم عند x = 5.',
      explanationMath: 'x = 5'
    },
    {
      id: 'psd-q5',
      conceptId: 'problem-solving-derivatives',
      questionNumber: 5,
      questionText: 'قاعدة اشتقاق دالة ناطقة على شكل u(x)/v(x) هي:',
      questionMath: '\\left(\\frac{u}{v}\\right)\' = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: "\\frac{u'v - uv'}{v^2}" },
        { id: 'opt_2', text: '', mathTex: "\\frac{u'v + uv'}{v^2}" },
        { id: 'opt_3', text: '', mathTex: "\\frac{u'}{v'}" }
      ],
      correctOptionId: 'opt_1',
      explanation: 'قاعدة اشتقاق خارج القسمة هي (u/v)\' = (u\'v - uv\') / v².',
      explanationMath: "\\left(\\frac{u}{v}\\right)' = \\frac{u'v-uv'}{v^2}"
    },
    {
      id: 'psd-q6',
      conceptId: 'problem-solving-derivatives',
      questionNumber: 6,
      questionText: 'لتكن f(x) = x² - 6x + 10 على ℝ. القيمة الدنيا للدالة f هي:',
      questionMath: 'f(x) = x^2 - 6x + 10',
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '3' },
        { id: 'opt_3', text: '', mathTex: '0' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f\'(x) = 2x - 6 تنعدم عند x = 3، وf(3) = 9 - 18 + 10 = 1 هي القيمة الدنيا.',
      explanationMath: 'f(3) = 1'
    },
    {
      id: 'psd-q7',
      conceptId: 'problem-solving-derivatives',
      questionNumber: 7,
      questionText: 'تتحقق القيمة الدنيا لنفس الدالة f(x) = x² - 6x + 10 عند:',
      questionMath: "f'(x) = 0",
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = 3' },
        { id: 'opt_2', text: '', mathTex: 'x = 1' },
        { id: 'opt_3', text: '', mathTex: 'x = 6' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f\'(x) = 2x - 6 تنعدم عند x = 3.',
      explanationMath: 'x = 3'
    },
    {
      id: 'psd-q8',
      conceptId: 'problem-solving-derivatives',
      questionNumber: 8,
      questionText: 'لتكن g(x) = x + 4/x على ]0, +∞[. القيمة الدنيا للدالة g هي:',
      questionMath: 'g(x) = x + \\frac{4}{x}',
      options: [
        { id: 'opt_1', text: '', mathTex: '4' },
        { id: 'opt_2', text: '', mathTex: '2' },
        { id: 'opt_3', text: '', mathTex: '8' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'g\'(x) = 1 - 4/x² تنعدم عند x = 2، وg(2) = 2 + 2 = 4 هي القيمة الدنيا.',
      explanationMath: 'g(2) = 4'
    },
    {
      id: 'psd-q9',
      conceptId: 'problem-solving-derivatives',
      questionNumber: 9,
      questionText: 'تتحقق القيمة الدنيا لنفس الدالة g(x) = x + 4/x عند:',
      questionMath: "g'(x) = 0",
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = 2' },
        { id: 'opt_2', text: '', mathTex: 'x = 4' },
        { id: 'opt_3', text: '', mathTex: 'x = 1' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'g\'(x) = 1 - 4/x² = 0 يكافئ x² = 4، والحل الموجب هو x = 2.',
      explanationMath: 'x = 2'
    },
    {
      id: 'psd-q10',
      conceptId: 'problem-solving-derivatives',
      questionNumber: 10,
      questionText: 'عند حل مسائل التعظيم أو التصغير باستعمال المشتقات، الخطوة الأولى المنهجية هي:',
      questionMath: '\\text{Optimisation}',
      options: [
        { id: 'opt_1', text: 'التعبير عن الكمية المطلوبة بدلالة متغير واحد' },
        { id: 'opt_2', text: 'اشتقاق الدالة مباشرة دون تعريفها' },
        { id: 'opt_3', text: 'حساب القيمة عند نقطة عشوائية' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'يجب أولاً صياغة الدالة الرياضية بدلالة متغير واحد قبل اشتقاقها ودراسة تغيراتها.',
      explanationMath: '\\text{méthode}'
    }
  ],

  // 8. الدوال المثلثية والمعادلات التفاضلية
  'trig-derivatives-diff-equations': [
    {
      id: 'tdd-q1',
      conceptId: 'trig-derivatives-diff-equations',
      questionNumber: 1,
      questionText: 'مشتقة الدالة f(x) = cos(2x) هي:',
      questionMath: 'f(x) = \\cos(2x)',
      options: [
        { id: 'opt_1', text: '', mathTex: '-2\\sin(2x)' },
        { id: 'opt_2', text: '', mathTex: '2\\sin(2x)' },
        { id: 'opt_3', text: '', mathTex: '-\\sin(2x)' }
      ],
      correctOptionId: 'opt_1',
      explanation: "(cos(u))' = -u' sin(u)، حيث u = 2x.",
      explanationMath: "f'(x) = -2\\sin(2x)"
    },
    {
      id: 'tdd-q2',
      conceptId: 'trig-derivatives-diff-equations',
      questionNumber: 2,
      questionText: 'قيمة f\'(π/4) لنفس الدالة f(x) = cos(2x) هي:',
      questionMath: "f'(\\pi/4) = ?",
      options: [
        { id: 'opt_1', text: '', mathTex: '-2' },
        { id: 'opt_2', text: '', mathTex: '2' },
        { id: 'opt_3', text: '', mathTex: '0' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f\'(π/4) = -2 sin(π/2) = -2 × 1 = -2.',
      explanationMath: "f'(\\pi/4) = -2"
    },
    {
      id: 'tdd-q3',
      conceptId: 'trig-derivatives-diff-equations',
      questionNumber: 3,
      questionText: 'الحل العام للمعادلة التفاضلية y\'\' + 4y = 0 هو:',
      questionMath: "y'' + 4y = 0",
      options: [
        { id: 'opt_1', text: '', mathTex: 'A\\cos(2x) + B\\sin(2x)' },
        { id: 'opt_2', text: '', mathTex: 'Ae^{2x} + B' },
        { id: 'opt_3', text: '', mathTex: 'Ax^2 + Bx' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الحل العام للمعادلة y\'\' + ω²y = 0 هو y = A cos(ωx) + B sin(ωx) حيث هنا ω = 2.',
      explanationMath: 'y = A\\cos(2x) + B\\sin(2x)'
    },
    {
      id: 'tdd-q4',
      conceptId: 'trig-derivatives-diff-equations',
      questionNumber: 4,
      questionText: 'الحل الخاص للمعادلة y\'\' + 4y = 0 الذي يحقق y(0) = 1 و y\'(0) = 0 هو:',
      questionMath: 'y(0) = 1, \\; y\'(0) = 0',
      options: [
        { id: 'opt_1', text: '', mathTex: '\\cos(2x)' },
        { id: 'opt_2', text: '', mathTex: '\\sin(2x)' },
        { id: 'opt_3', text: '', mathTex: '\\cos(2x) + 1' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'من y(0)=1 نجد A=1، ومن y\'(0)=0 نجد B=0، فالحل الخاص هو cos(2x).',
      explanationMath: 'y(x) = \\cos(2x)'
    },
    {
      id: 'tdd-q5',
      conceptId: 'trig-derivatives-diff-equations',
      questionNumber: 5,
      questionText: 'قيمة y(π/2) لنفس الحل الخاص y(x) = cos(2x) هي:',
      questionMath: 'y(\\pi/2) = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: '-1' },
        { id: 'opt_2', text: '', mathTex: '1' },
        { id: 'opt_3', text: '', mathTex: '0' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'y(π/2) = cos(π) = -1.',
      explanationMath: 'y(\\pi/2) = -1'
    },
    {
      id: 'tdd-q6',
      conceptId: 'trig-derivatives-diff-equations',
      questionNumber: 6,
      questionText: 'مشتقة الدالة f(x) = sin(3x) هي:',
      questionMath: 'f(x) = \\sin(3x)',
      options: [
        { id: 'opt_1', text: '', mathTex: '3\\cos(3x)' },
        { id: 'opt_2', text: '', mathTex: '-3\\cos(3x)' },
        { id: 'opt_3', text: '', mathTex: '\\cos(3x)' }
      ],
      correctOptionId: 'opt_1',
      explanation: "(sin(u))' = u' cos(u) حيث u(x) = 3x.",
      explanationMath: "f'(x) = 3\\cos(3x)"
    },
    {
      id: 'tdd-q7',
      conceptId: 'trig-derivatives-diff-equations',
      questionNumber: 7,
      questionText: 'مشتقة الدالة f(x) = sin(x) + cos(x) هي:',
      questionMath: 'f(x) = \\sin(x) + \\cos(x)',
      options: [
        { id: 'opt_1', text: '', mathTex: '\\cos(x) - \\sin(x)' },
        { id: 'opt_2', text: '', mathTex: '\\cos(x) + \\sin(x)' },
        { id: 'opt_3', text: '', mathTex: '-\\cos(x) - \\sin(x)' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'مشتقة sin(x) هي cos(x)، ومشتقة cos(x) هي -sin(x).',
      explanationMath: "f'(x) = \\cos(x) - \\sin(x)"
    },
    {
      id: 'tdd-q8',
      conceptId: 'trig-derivatives-diff-equations',
      questionNumber: 8,
      questionText: 'الحل العام للمعادلة التفاضلية y\'\' + 9y = 0 هو:',
      questionMath: "y'' + 9y = 0",
      options: [
        { id: 'opt_1', text: '', mathTex: 'A\\cos(3x) + B\\sin(3x)' },
        { id: 'opt_2', text: '', mathTex: 'A\\cos(9x) + B\\sin(9x)' },
        { id: 'opt_3', text: '', mathTex: 'Ae^{3x} + B' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'هنا ω² = 9 إذن ω = 3، والحل العام هو A cos(3x) + B sin(3x).',
      explanationMath: 'y = A\\cos(3x) + B\\sin(3x)'
    },
    {
      id: 'tdd-q9',
      conceptId: 'trig-derivatives-diff-equations',
      questionNumber: 9,
      questionText: 'الحل الخاص للمعادلة y\'\' + 9y = 0 الذي يحقق y(0) = 0 و y\'(0) = 3 هو:',
      questionMath: "y(0) = 0, \\; y'(0) = 3",
      options: [
        { id: 'opt_1', text: '', mathTex: '\\sin(3x)' },
        { id: 'opt_2', text: '', mathTex: '\\cos(3x)' },
        { id: 'opt_3', text: '', mathTex: '3\\sin(3x)' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'من y(0)=0 نجد A=0، ومن y\'(0) = 3B = 3 نجد B=1، فالحل هو sin(3x).',
      explanationMath: 'y(x) = \\sin(3x)'
    },
    {
      id: 'tdd-q10',
      conceptId: 'trig-derivatives-diff-equations',
      questionNumber: 10,
      questionText: 'قيمة y(π/6) لنفس الحل الخاص y(x) = sin(3x) هي:',
      questionMath: 'y(\\pi/6) = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '-1' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'y(π/6) = sin(3 × π/6) = sin(π/2) = 1.',
      explanationMath: 'y(\\pi/6) = 1'
    }
  ],

  // 10. معادلات ومتراجحات أسية
  'exponential-equations-inequalities': [
    {
      id: 'eei-q1',
      conceptId: 'exponential-equations-inequalities',
      questionNumber: 1,
      questionText: 'حل المعادلة e^(2x-1) = 1 في ℝ هو:',
      questionMath: 'e^{2x-1} = 1',
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = \\frac{1}{2}' },
        { id: 'opt_2', text: '', mathTex: 'x = 1' },
        { id: 'opt_3', text: '', mathTex: 'x = 0' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'e^(2x-1) = e^0 يكافئ 2x - 1 = 0، إذن x = 1/2.',
      explanationMath: 'x = \\frac{1}{2}'
    },
    {
      id: 'eei-q2',
      conceptId: 'exponential-equations-inequalities',
      questionNumber: 2,
      questionText: 'أصغر عدد صحيح x يحقق المتراجحة e^(x+1) > e³ هو:',
      questionMath: 'e^{x+1} > e^3',
      options: [
        { id: 'opt_1', text: '', mathTex: '3' },
        { id: 'opt_2', text: '', mathTex: '2' },
        { id: 'opt_3', text: '', mathTex: '4' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'المتراجحة تكافئ x + 1 > 3 أي x > 2، وأصغر عدد صحيح أكبر من 2 هو 3.',
      explanationMath: 'x > 2'
    },
    {
      id: 'eei-q3',
      conceptId: 'exponential-equations-inequalities',
      questionNumber: 3,
      questionText: 'حل المعادلة e^x = e^5 هو:',
      questionMath: 'e^x = e^5',
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = 5' },
        { id: 'opt_2', text: '', mathTex: 'x = 1' },
        { id: 'opt_3', text: '', mathTex: 'x = e^5' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الدالة الأسية تقابل تام، فتساوي e^x = e^5 يكافئ x = 5.',
      explanationMath: 'x = 5'
    },
    {
      id: 'eei-q4',
      conceptId: 'exponential-equations-inequalities',
      questionNumber: 4,
      questionText: 'إذا كان e^a = e^b حيث a, b عددان حقيقيان، فإن:',
      questionMath: 'e^a = e^b',
      options: [
        { id: 'opt_1', text: '', mathTex: 'a = b' },
        { id: 'opt_2', text: '', mathTex: 'a = -b' },
        { id: 'opt_3', text: '', mathTex: 'a = \\frac{1}{b}' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الدالة الأسية تقابل تام على ℝ، فتساوي صورتيها يعني تساوي سابقتيهما.',
      explanationMath: 'a = b'
    },
    {
      id: 'eei-q5',
      conceptId: 'exponential-equations-inequalities',
      questionNumber: 5,
      questionText: 'حل المتراجحة e^x < 1 في ℝ هو:',
      questionMath: 'e^x < 1',
      options: [
        { id: 'opt_1', text: '', mathTex: 'x < 0' },
        { id: 'opt_2', text: '', mathTex: 'x > 0' },
        { id: 'opt_3', text: '', mathTex: 'x < 1' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'e^x < 1 = e^0 يكافئ x < 0 لأن الدالة الأسية متزايدة تماما.',
      explanationMath: 'x < 0'
    },
    {
      id: 'eei-q6',
      conceptId: 'exponential-equations-inequalities',
      questionNumber: 6,
      questionText: 'حل المعادلة e^(3x) = e^(x+4) في ℝ هو:',
      questionMath: 'e^{3x} = e^{x+4}',
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = 2' },
        { id: 'opt_2', text: '', mathTex: 'x = 4' },
        { id: 'opt_3', text: '', mathTex: 'x = 1' }
      ],
      correctOptionId: 'opt_1',
      explanation: '3x = x + 4 يكافئ 2x = 4، إذن x = 2.',
      explanationMath: 'x = 2'
    },
    {
      id: 'eei-q7',
      conceptId: 'exponential-equations-inequalities',
      questionNumber: 7,
      questionText: 'حل المعادلة e^(-x) = e² في ℝ هو:',
      questionMath: 'e^{-x} = e^2',
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = -2' },
        { id: 'opt_2', text: '', mathTex: 'x = 2' },
        { id: 'opt_3', text: '', mathTex: 'x = -1' }
      ],
      correctOptionId: 'opt_1',
      explanation: '-x = 2 يكافئ x = -2.',
      explanationMath: 'x = -2'
    },
    {
      id: 'eei-q8',
      conceptId: 'exponential-equations-inequalities',
      questionNumber: 8,
      questionText: 'أكبر عدد صحيح x يحقق المتراجحة e^x < e⁴ هو:',
      questionMath: 'e^x < e^4',
      options: [
        { id: 'opt_1', text: '', mathTex: '3' },
        { id: 'opt_2', text: '', mathTex: '4' },
        { id: 'opt_3', text: '', mathTex: '5' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'المتراجحة تكافئ x < 4، وأكبر عدد صحيح أصغر تماما من 4 هو 3.',
      explanationMath: 'x < 4'
    },
    {
      id: 'eei-q9',
      conceptId: 'exponential-equations-inequalities',
      questionNumber: 9,
      questionText: 'حل المعادلة e^(2x) = 1 في ℝ هو:',
      questionMath: 'e^{2x} = 1',
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = 0' },
        { id: 'opt_2', text: '', mathTex: 'x = 1' },
        { id: 'opt_3', text: '', mathTex: 'x = 2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'e^(2x) = e^0 يكافئ 2x = 0، إذن x = 0.',
      explanationMath: 'x = 0'
    },
    {
      id: 'eei-q10',
      conceptId: 'exponential-equations-inequalities',
      questionNumber: 10,
      questionText: 'مجموعة حلول المتراجحة e^x ≥ e في ℝ هي:',
      questionMath: 'e^x \\geq e',
      options: [
        { id: 'opt_1', text: '', mathTex: '[1,+\\infty[' },
        { id: 'opt_2', text: '', mathTex: ']1,+\\infty[' },
        { id: 'opt_3', text: '', mathTex: ']-\\infty,1]' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'e^x ≥ e¹ يكافئ x ≥ 1.',
      explanationMath: 'x \\geq 1'
    }
  ],

  // 11. خواص الدوال الأسية e^(kx)
  'exponential-kx-properties': [
    {
      id: 'ekp-q1',
      conceptId: 'exponential-kx-properties',
      questionNumber: 1,
      questionText: 'لتكن f(t) = 50e^(2t). مشتقتها f\'(t) هي:',
      questionMath: 'f(t) = 50e^{2t}',
      options: [
        { id: 'opt_1', text: '', mathTex: '100e^{2t}' },
        { id: 'opt_2', text: '', mathTex: '50e^{2t}' },
        { id: 'opt_3', text: '', mathTex: '100e^{t}' }
      ],
      correctOptionId: 'opt_1',
      explanation: "(e^{kt})' = k e^{kt}، حيث k=2، إذن f'(t) = 100e^{2t}.",
      explanationMath: "f'(t) = 100e^{2t}"
    },
    {
      id: 'ekp-q2',
      conceptId: 'exponential-kx-properties',
      questionNumber: 2,
      questionText: 'قيمة f\'(0) لنفس الدالة f(t) = 50e^(2t) هي:',
      questionMath: "f'(0) = ?",
      options: [
        { id: 'opt_1', text: '', mathTex: '100' },
        { id: 'opt_2', text: '', mathTex: '50' },
        { id: 'opt_3', text: '', mathTex: '2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f\'(0) = 100e^0 = 100.',
      explanationMath: "f'(0) = 100"
    },
    {
      id: 'ekp-q3',
      conceptId: 'exponential-kx-properties',
      questionNumber: 3,
      questionText: 'حل المعادلة 2e^(3x) = 2e^6 في ℝ هو:',
      questionMath: '2e^{3x} = 2e^{6}',
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = 2' },
        { id: 'opt_2', text: '', mathTex: 'x = 3' },
        { id: 'opt_3', text: '', mathTex: 'x = 6' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'بقسمة الطرفين على 2 نحصل على e^(3x) = e^6، إذن 3x = 6 أي x = 2.',
      explanationMath: 'x = 2'
    },
    {
      id: 'ekp-q4',
      conceptId: 'exponential-kx-properties',
      questionNumber: 4,
      questionText: 'مشتقة الدالة e^(kx) بدلالة k هي:',
      questionMath: '(e^{kx})\' = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: 'k \\, e^{kx}' },
        { id: 'opt_2', text: '', mathTex: 'e^{kx}' },
        { id: 'opt_3', text: '', mathTex: 'k^2 e^{kx}' }
      ],
      correctOptionId: 'opt_1',
      explanation: "القاعدة العامة: (e^{kx})' = k e^{kx}.",
      explanationMath: "(e^{kx})' = ke^{kx}"
    },
    {
      id: 'ekp-q5',
      conceptId: 'exponential-kx-properties',
      questionNumber: 5,
      questionText: 'عندما يكون k < 0، نهاية الدالة e^(kx) عند +∞ تساوي:',
      questionMath: '\\lim_{x \\to +\\infty} e^{kx}, \\; k<0',
      options: [
        { id: 'opt_1', text: '', mathTex: '0' },
        { id: 'opt_2', text: '', mathTex: '+\\infty' },
        { id: 'opt_3', text: '', mathTex: '1' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'إذا كان k < 0 فإن kx تؤول إلى -∞ عند +∞، وبالتالي e^(kx) تؤول إلى 0.',
      explanationMath: '\\lim = 0'
    },
    {
      id: 'ekp-q6',
      conceptId: 'exponential-kx-properties',
      questionNumber: 6,
      questionText: 'الدالة f(t) = 20e^(-0.5t) التي تصف تناقص كمية بمرور الزمن، إشارة الأس -0.5t تعني أن الدالة:',
      questionMath: 'f(t) = 20e^{-0.5t}',
      options: [
        { id: 'opt_1', text: 'متناقصة (اضمحلال أسي)' },
        { id: 'opt_2', text: 'متزايدة (نمو أسي)' },
        { id: 'opt_3', text: 'ثابتة' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'معامل k = -0.5 سالب، وهذا يعني أن الدالة e^(kt) متناقصة (نموذج اضمحلال).',
      explanationMath: 'k < 0 \\implies \\text{اضمحلال}'
    },
    {
      id: 'ekp-q7',
      conceptId: 'exponential-kx-properties',
      questionNumber: 7,
      questionText: 'نهاية الدالة f(t) = e^(-t) عندما t تؤول إلى +∞ هي:',
      questionMath: '\\lim_{t \\to +\\infty} e^{-t}',
      options: [
        { id: 'opt_1', text: '', mathTex: '0' },
        { id: 'opt_2', text: '', mathTex: '+\\infty' },
        { id: 'opt_3', text: '', mathTex: '1' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الأس -t يؤول إلى -∞ عند +∞، وe إلى أس يؤول إلى -∞ يؤول إلى 0.',
      explanationMath: '\\lim = 0'
    },
    {
      id: 'ekp-q8',
      conceptId: 'exponential-kx-properties',
      questionNumber: 8,
      questionText: 'نهاية الدالة f(t) = e^(3t) عندما t تؤول إلى +∞ هي:',
      questionMath: '\\lim_{t \\to +\\infty} e^{3t}',
      options: [
        { id: 'opt_1', text: '', mathTex: '+\\infty' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '1' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الأس 3t يؤول إلى +∞ عند +∞، وe إلى أس يؤول إلى +∞ يؤول إلى +∞.',
      explanationMath: '\\lim = +\\infty'
    },
    {
      id: 'ekp-q9',
      conceptId: 'exponential-kx-properties',
      questionNumber: 9,
      questionText: 'حل المعادلة e^(kx) = 1 في ℝ (حيث k ≠ 0) هو:',
      questionMath: 'e^{kx} = 1',
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = 0' },
        { id: 'opt_2', text: '', mathTex: 'x = k' },
        { id: 'opt_3', text: '', mathTex: 'x = \\frac{1}{k}' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'e^(kx) = e^0 يكافئ kx = 0، وبما أن k ≠ 0 فإن x = 0.',
      explanationMath: 'x = 0'
    },
    {
      id: 'ekp-q10',
      conceptId: 'exponential-kx-properties',
      questionNumber: 10,
      questionText: 'لتكن f(t) = 200e^(0.1t). قيمة f(0) هي:',
      questionMath: 'f(0) = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: '200' },
        { id: 'opt_2', text: '', mathTex: '0.1' },
        { id: 'opt_3', text: '', mathTex: '20' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f(0) = 200e^0 = 200 × 1 = 200.',
      explanationMath: 'f(0) = 200'
    }
  ],

  // 12. دراسة الدالة المركبة exp∘u
  'exponential-composite-exp-u': [
    {
      id: 'ece-q1',
      conceptId: 'exponential-composite-exp-u',
      questionNumber: 1,
      questionText: 'مشتقة الدالة f(x) = e^(x²-1) هي:',
      questionMath: 'f(x) = e^{x^2-1}',
      options: [
        { id: 'opt_1', text: '', mathTex: '2x\\, e^{x^2-1}' },
        { id: 'opt_2', text: '', mathTex: 'e^{x^2-1}' },
        { id: 'opt_3', text: '', mathTex: '2x\\, e^{x^2}' }
      ],
      correctOptionId: 'opt_1',
      explanation: "(e^u)' = u' e^u حيث u(x) = x²-1 و u'(x) = 2x.",
      explanationMath: "f'(x) = 2xe^{x^2-1}"
    },
    {
      id: 'ece-q2',
      conceptId: 'exponential-composite-exp-u',
      questionNumber: 2,
      questionText: 'قيمة f\'(1) لنفس الدالة f(x) = e^(x²-1) هي:',
      questionMath: "f'(1) = ?",
      options: [
        { id: 'opt_1', text: '', mathTex: '2' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '1' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f\'(1) = 2(1)e^(1-1) = 2e^0 = 2.',
      explanationMath: "f'(1) = 2"
    },
    {
      id: 'ece-q3',
      conceptId: 'exponential-composite-exp-u',
      questionNumber: 3,
      questionText: 'قاعدة اشتقاق الدالة المركبة e^(u(x)) هي:',
      questionMath: '(e^u)\' = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: "u' e^u" },
        { id: 'opt_2', text: '', mathTex: 'e^{u\'}' },
        { id: 'opt_3', text: '', mathTex: "u\\, e^{u'}" }
      ],
      correctOptionId: 'opt_1',
      explanation: "(e^u)' = u' e^u هي القاعدة العامة لاشتقاق الدالة المركبة الأسية.",
      explanationMath: "(e^u)' = u'e^u"
    },
    {
      id: 'ece-q4',
      conceptId: 'exponential-composite-exp-u',
      questionNumber: 4,
      questionText: 'نهاية الدالة f(x) = e^(-x²+1) عندما x تؤول إلى +∞ هي:',
      questionMath: '\\lim_{x \\to +\\infty} e^{-x^2+1}',
      options: [
        { id: 'opt_1', text: '', mathTex: '0' },
        { id: 'opt_2', text: '', mathTex: '+\\infty' },
        { id: 'opt_3', text: '', mathTex: '1' }
      ],
      correctOptionId: 'opt_1',
      explanation: '-x²+1 تؤول إلى -∞ عند +∞، ونهاية e إلى الأس عند -∞ هي 0.',
      explanationMath: '\\lim = 0'
    },
    {
      id: 'ece-q5',
      conceptId: 'exponential-composite-exp-u',
      questionNumber: 5,
      questionText: 'نهاية الدالة e^(x²) عندما x تؤول إلى +∞ هي:',
      questionMath: '\\lim_{x \\to +\\infty} e^{x^2}',
      options: [
        { id: 'opt_1', text: '', mathTex: '+\\infty' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '1' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'x² تؤول إلى +∞ عند +∞، ونهاية e إلى الأس عند +∞ هي +∞.',
      explanationMath: '\\lim = +\\infty'
    },
    {
      id: 'ece-q6',
      conceptId: 'exponential-composite-exp-u',
      questionNumber: 6,
      questionText: 'مشتقة الدالة f(x) = e^(3x+1) هي:',
      questionMath: 'f(x) = e^{3x+1}',
      options: [
        { id: 'opt_1', text: '', mathTex: '3e^{3x+1}' },
        { id: 'opt_2', text: '', mathTex: 'e^{3x+1}' },
        { id: 'opt_3', text: '', mathTex: '3xe^{3x+1}' }
      ],
      correctOptionId: 'opt_1',
      explanation: "(e^u)' = u' e^u حيث u(x) = 3x+1 و u'(x) = 3.",
      explanationMath: "f'(x) = 3e^{3x+1}"
    },
    {
      id: 'ece-q7',
      conceptId: 'exponential-composite-exp-u',
      questionNumber: 7,
      questionText: 'مشتقة الدالة f(x) = e^(√x) على ]0, +∞[ هي:',
      questionMath: 'f(x) = e^{\\sqrt{x}}',
      options: [
        { id: 'opt_1', text: '', mathTex: '\\frac{e^{\\sqrt{x}}}{2\\sqrt{x}}' },
        { id: 'opt_2', text: '', mathTex: 'e^{\\sqrt{x}}' },
        { id: 'opt_3', text: '', mathTex: '2\\sqrt{x}\\,e^{\\sqrt{x}}' }
      ],
      correctOptionId: 'opt_1',
      explanation: "(e^u)' = u' e^u حيث u(x) = √x و u'(x) = 1/(2√x).",
      explanationMath: "f'(x) = \\frac{e^{\\sqrt{x}}}{2\\sqrt{x}}"
    },
    {
      id: 'ece-q8',
      conceptId: 'exponential-composite-exp-u',
      questionNumber: 8,
      questionText: 'نهاية الدالة e^(1/x) عندما x تؤول إلى +∞ هي:',
      questionMath: '\\lim_{x \\to +\\infty} e^{1/x}',
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '+\\infty' }
      ],
      correctOptionId: 'opt_1',
      explanation: '1/x تؤول إلى 0 عند +∞، وe^0 = 1.',
      explanationMath: '\\lim = 1'
    },
    {
      id: 'ece-q9',
      conceptId: 'exponential-composite-exp-u',
      questionNumber: 9,
      questionText: 'نهاية الدالة e^(1/x) عندما x تؤول إلى 0⁺ هي:',
      questionMath: '\\lim_{x \\to 0^+} e^{1/x}',
      options: [
        { id: 'opt_1', text: '', mathTex: '+\\infty' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '1' }
      ],
      correctOptionId: 'opt_1',
      explanation: '1/x تؤول إلى +∞ عند 0⁺، وe إلى أس يؤول إلى +∞ يؤول إلى +∞.',
      explanationMath: '\\lim = +\\infty'
    },
    {
      id: 'ece-q10',
      conceptId: 'exponential-composite-exp-u',
      questionNumber: 10,
      questionText: 'مشتقة الدالة f(x) = e^(x³) هي:',
      questionMath: 'f(x) = e^{x^3}',
      options: [
        { id: 'opt_1', text: '', mathTex: '3x^2 e^{x^3}' },
        { id: 'opt_2', text: '', mathTex: 'x^2 e^{x^3}' },
        { id: 'opt_3', text: '', mathTex: 'e^{3x^2}' }
      ],
      correctOptionId: 'opt_1',
      explanation: "(e^u)' = u' e^u حيث u(x) = x³ و u'(x) = 3x².",
      explanationMath: "f'(x) = 3x^2 e^{x^3}"
    }
  ],

  // 14. معادلات ومتراجحات لوغاريتمية
  'logarithm-equations-inequalities': [
    {
      id: 'lei-q1',
      conceptId: 'logarithm-equations-inequalities',
      questionNumber: 1,
      questionText: 'حل المعادلة ln(x) = 2 في ℝ هو:',
      questionMath: '\\ln(x) = 2',
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = e^2' },
        { id: 'opt_2', text: '', mathTex: 'x = 2' },
        { id: 'opt_3', text: '', mathTex: 'x = e' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'بتطبيق الدالة الأسية على الطرفين نحصل على x = e².',
      explanationMath: 'x = e^2'
    },
    {
      id: 'lei-q2',
      conceptId: 'logarithm-equations-inequalities',
      questionNumber: 2,
      questionText: 'مجموعة حلول المتراجحة ln(x-1) < ln(4) مع مراعاة مجال التعريف هي:',
      questionMath: '\\ln(x-1) < \\ln(4)',
      options: [
        { id: 'opt_1', text: '', mathTex: ']1,5[' },
        { id: 'opt_2', text: '', mathTex: ']1,4[' },
        { id: 'opt_3', text: '', mathTex: ']-\\infty,5[' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'مجال التعريف يفرض x > 1، والمتراجحة تكافئ x < 5، فمجموعة الحلول هي ]1,5[.',
      explanationMath: ']1,5['
    },
    {
      id: 'lei-q3',
      conceptId: 'logarithm-equations-inequalities',
      questionNumber: 3,
      questionText: 'أكبر عدد صحيح يحقق المتراجحة السابقة ln(x-1) < ln(4) هو:',
      questionMath: 'x \\in \\,]1,5[',
      options: [
        { id: 'opt_1', text: '', mathTex: '4' },
        { id: 'opt_2', text: '', mathTex: '5' },
        { id: 'opt_3', text: '', mathTex: '3' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'مجموعة الحلول هي ]1,5[، وأكبر عدد صحيح فيها هو 4.',
      explanationMath: 'x_{max} = 4'
    },
    {
      id: 'lei-q4',
      conceptId: 'logarithm-equations-inequalities',
      questionNumber: 4,
      questionText: 'إذا كان ln(a) = ln(b) مع a, b > 0، فإن:',
      questionMath: '\\ln(a) = \\ln(b)',
      options: [
        { id: 'opt_1', text: '', mathTex: 'a = b' },
        { id: 'opt_2', text: '', mathTex: 'a = -b' },
        { id: 'opt_3', text: '', mathTex: 'a = \\frac{1}{b}' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الدالة ln تقابل تام على ]0,+∞[، فتساوي الصورتين يكافئ تساوي السابقتين.',
      explanationMath: 'a = b'
    },
    {
      id: 'lei-q5',
      conceptId: 'logarithm-equations-inequalities',
      questionNumber: 5,
      questionText: 'حل المعادلة ln(x) = 0 هو:',
      questionMath: '\\ln(x) = 0',
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = 1' },
        { id: 'opt_2', text: '', mathTex: 'x = 0' },
        { id: 'opt_3', text: '', mathTex: 'x = e' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'ln(x) = 0 = ln(1) يكافئ x = 1.',
      explanationMath: 'x = 1'
    },
    {
      id: 'lei-q6',
      conceptId: 'logarithm-equations-inequalities',
      questionNumber: 6,
      questionText: 'حل المعادلة ln(2x) = ln(6) في ℝ هو:',
      questionMath: '\\ln(2x) = \\ln(6)',
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = 3' },
        { id: 'opt_2', text: '', mathTex: 'x = 6' },
        { id: 'opt_3', text: '', mathTex: 'x = 12' }
      ],
      correctOptionId: 'opt_1',
      explanation: '2x = 6 يكافئ x = 3.',
      explanationMath: 'x = 3'
    },
    {
      id: 'lei-q7',
      conceptId: 'logarithm-equations-inequalities',
      questionNumber: 7,
      questionText: 'حل المعادلة ln(x) = 1 في ℝ هو:',
      questionMath: '\\ln(x) = 1',
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = e' },
        { id: 'opt_2', text: '', mathTex: 'x = 1' },
        { id: 'opt_3', text: '', mathTex: 'x = 10' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'ln(x) = 1 = ln(e) يكافئ x = e.',
      explanationMath: 'x = e'
    },
    {
      id: 'lei-q8',
      conceptId: 'logarithm-equations-inequalities',
      questionNumber: 8,
      questionText: 'مجموعة حلول المتراجحة ln(x) > 0 في مجال التعريف هي:',
      questionMath: '\\ln(x) > 0',
      options: [
        { id: 'opt_1', text: '', mathTex: ']1,+\\infty[' },
        { id: 'opt_2', text: '', mathTex: ']0,+\\infty[' },
        { id: 'opt_3', text: '', mathTex: ']0,1[' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'ln(x) > 0 = ln(1) يكافئ x > 1 (لأن ln متزايدة تماما).',
      explanationMath: 'x > 1'
    },
    {
      id: 'lei-q9',
      conceptId: 'logarithm-equations-inequalities',
      questionNumber: 9,
      questionText: 'لكي تكون المعادلة ln(x - 3) = 2 معرفة، يجب أن يتحقق:',
      questionMath: '\\ln(x-3) = 2',
      options: [
        { id: 'opt_1', text: '', mathTex: 'x > 3' },
        { id: 'opt_2', text: '', mathTex: 'x > 0' },
        { id: 'opt_3', text: '', mathTex: 'x \\geq 3' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'يجب أن يكون طرف اللوغاريتم موجباً قطعاً: x - 3 > 0.',
      explanationMath: 'x > 3'
    },
    {
      id: 'lei-q10',
      conceptId: 'logarithm-equations-inequalities',
      questionNumber: 10,
      questionText: 'حل المعادلة ln(x - 3) = 2 مع مراعاة مجال التعريف هو:',
      questionMath: '\\ln(x-3) = 2',
      options: [
        { id: 'opt_1', text: '', mathTex: 'x = e^2 + 3' },
        { id: 'opt_2', text: '', mathTex: 'x = e^2' },
        { id: 'opt_3', text: '', mathTex: 'x = 5' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'x - 3 = e² يكافئ x = e² + 3، وهذا العدد أكبر من 3 فعلاً.',
      explanationMath: 'x = e^2 + 3'
    }
  ],

  // 15. الدالة ln∘u واللوغاريتم العشري
  'logarithm-composite-and-decimal': [
    {
      id: 'lcd-q1',
      conceptId: 'logarithm-composite-and-decimal',
      questionNumber: 1,
      questionText: 'مشتقة الدالة f(x) = ln(x² + 1) هي:',
      questionMath: 'f(x) = \\ln(x^2+1)',
      options: [
        { id: 'opt_1', text: '', mathTex: '\\frac{2x}{x^2+1}' },
        { id: 'opt_2', text: '', mathTex: '\\frac{1}{x^2+1}' },
        { id: 'opt_3', text: '', mathTex: '2x' }
      ],
      correctOptionId: 'opt_1',
      explanation: "(ln(u))' = u'/u حيث u(x) = x²+1 و u'(x) = 2x.",
      explanationMath: "f'(x) = \\frac{2x}{x^2+1}"
    },
    {
      id: 'lcd-q2',
      conceptId: 'logarithm-composite-and-decimal',
      questionNumber: 2,
      questionText: 'قيمة f\'(1) لنفس الدالة f(x) = ln(x²+1) هي:',
      questionMath: "f'(1) = ?",
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '2' },
        { id: 'opt_3', text: '', mathTex: '0.5' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'f\'(1) = 2(1)/(1²+1) = 2/2 = 1.',
      explanationMath: "f'(1) = 1"
    },
    {
      id: 'lcd-q3',
      conceptId: 'logarithm-composite-and-decimal',
      questionNumber: 3,
      questionText: 'قاعدة اشتقاق الدالة المركبة ln(u(x)) هي:',
      questionMath: '(\\ln(u))\' = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: "\\frac{u'}{u}" },
        { id: 'opt_2', text: '', mathTex: '\\frac{1}{u}' },
        { id: 'opt_3', text: '', mathTex: "u'" }
      ],
      correctOptionId: 'opt_1',
      explanation: "(ln(u))' = u'/u هي القاعدة العامة.",
      explanationMath: "(\\ln(u))' = \\frac{u'}{u}"
    },
    {
      id: 'lcd-q4',
      conceptId: 'logarithm-composite-and-decimal',
      questionNumber: 4,
      questionText: 'قيمة log(1000) حيث log هو اللوغاريتم العشري (الأساس 10) هي:',
      questionMath: '\\log(1000) = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: '3' },
        { id: 'opt_2', text: '', mathTex: '10' },
        { id: 'opt_3', text: '', mathTex: '1000' }
      ],
      correctOptionId: 'opt_1',
      explanation: '1000 = 10³، إذن log(1000) = 3.',
      explanationMath: '\\log(1000) = 3'
    },
    {
      id: 'lcd-q5',
      conceptId: 'logarithm-composite-and-decimal',
      questionNumber: 5,
      questionText: 'قيمة log(100) هي:',
      questionMath: '\\log(100) = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: '2' },
        { id: 'opt_2', text: '', mathTex: '10' },
        { id: 'opt_3', text: '', mathTex: '100' }
      ],
      correctOptionId: 'opt_1',
      explanation: '100 = 10²، إذن log(100) = 2.',
      explanationMath: '\\log(100) = 2'
    },
    {
      id: 'lcd-q6',
      conceptId: 'logarithm-composite-and-decimal',
      questionNumber: 6,
      questionText: 'مشتقة الدالة f(x) = ln(2x + 1) هي:',
      questionMath: 'f(x) = \\ln(2x+1)',
      options: [
        { id: 'opt_1', text: '', mathTex: '\\frac{2}{2x+1}' },
        { id: 'opt_2', text: '', mathTex: '\\frac{1}{2x+1}' },
        { id: 'opt_3', text: '', mathTex: '2' }
      ],
      correctOptionId: 'opt_1',
      explanation: "(ln(u))' = u'/u حيث u(x) = 2x+1 و u'(x) = 2.",
      explanationMath: "f'(x) = \\frac{2}{2x+1}"
    },
    {
      id: 'lcd-q7',
      conceptId: 'logarithm-composite-and-decimal',
      questionNumber: 7,
      questionText: 'مشتقة الدالة f(x) = ln(3 - x) على ]-∞, 3[ هي:',
      questionMath: 'f(x) = \\ln(3-x)',
      options: [
        { id: 'opt_1', text: '', mathTex: '\\frac{-1}{3-x}' },
        { id: 'opt_2', text: '', mathTex: '\\frac{1}{3-x}' },
        { id: 'opt_3', text: '', mathTex: '-(3-x)' }
      ],
      correctOptionId: 'opt_1',
      explanation: "(ln(u))' = u'/u حيث u(x) = 3-x و u'(x) = -1.",
      explanationMath: "f'(x) = \\frac{-1}{3-x}"
    },
    {
      id: 'lcd-q8',
      conceptId: 'logarithm-composite-and-decimal',
      questionNumber: 8,
      questionText: 'قيمة log(10000) حيث log هو اللوغاريتم العشري هي:',
      questionMath: '\\log(10000) = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: '4' },
        { id: 'opt_2', text: '', mathTex: '3' },
        { id: 'opt_3', text: '', mathTex: '10000' }
      ],
      correctOptionId: 'opt_1',
      explanation: '10000 = 10⁴، إذن log(10000) = 4.',
      explanationMath: '\\log(10000) = 4'
    },
    {
      id: 'lcd-q9',
      conceptId: 'logarithm-composite-and-decimal',
      questionNumber: 9,
      questionText: 'قيمة log(0.1) هي:',
      questionMath: '\\log(0.1) = ?',
      options: [
        { id: 'opt_1', text: '', mathTex: '-1' },
        { id: 'opt_2', text: '', mathTex: '1' },
        { id: 'opt_3', text: '', mathTex: '0' }
      ],
      correctOptionId: 'opt_1',
      explanation: '0.1 = 10^(-1)، إذن log(0.1) = -1.',
      explanationMath: '\\log(0.1) = -1'
    },
    {
      id: 'lcd-q10',
      conceptId: 'logarithm-composite-and-decimal',
      questionNumber: 10,
      questionText: 'العلاقة بين اللوغاريتم العشري log واللوغاريتم النيبيري ln هي log(x) = ln(x) / ؟',
      questionMath: '\\log(x) = \\frac{\\ln(x)}{?}',
      options: [
        { id: 'opt_1', text: '', mathTex: '\\ln(10)' },
        { id: 'opt_2', text: '', mathTex: '10' },
        { id: 'opt_3', text: '', mathTex: 'e' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'اللوغاريتم العشري معرف بـ log(x) = ln(x) / ln(10).',
      explanationMath: '\\log(x) = \\frac{\\ln(x)}{\\ln(10)}'
    }
  ],

  // 16. معادلات تفاضلية من الشكل y' = ay + b
  'differential-equations-ay-b': [
    {
      id: 'dae-q1',
      conceptId: 'differential-equations-ay-b',
      questionNumber: 1,
      questionText: "الحل العام للمعادلة التفاضلية y' = ay + b (حيث a ≠ 0) يكتب على الشكل:",
      questionMath: "y' = ay + b",
      options: [
        { id: 'opt_1', text: '', mathTex: 'y = Ce^{ax} - \\frac{b}{a}' },
        { id: 'opt_2', text: '', mathTex: 'y = Ce^{ax} + b' },
        { id: 'opt_3', text: '', mathTex: 'y = Cx + \\frac{b}{a}' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الحل العام يتكون من حل المعادلة المتجانسة Ce^(ax) زائد الحل الخاص الثابت -b/a.',
      explanationMath: 'y = Ce^{ax} - \\frac{b}{a}'
    },
    {
      id: 'dae-q2',
      conceptId: 'differential-equations-ay-b',
      questionNumber: 2,
      questionText: "الحل الخاص الثابت للمعادلة y' = 2y - 4 هو:",
      questionMath: "y' = 2y - 4",
      options: [
        { id: 'opt_1', text: '', mathTex: 'y = 2' },
        { id: 'opt_2', text: '', mathTex: 'y = 4' },
        { id: 'opt_3', text: '', mathTex: 'y = -2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الحل الخاص الثابت هو y_p = -b/a = -(-4)/2 = 2.',
      explanationMath: 'y_p = 2'
    },
    {
      id: 'dae-q3',
      conceptId: 'differential-equations-ay-b',
      questionNumber: 3,
      questionText: 'إذا كان الحل العام y = Ce^(2x) + 2 ويحقق y(0) = 5، فإن قيمة C هي:',
      questionMath: 'y(0) = 5',
      options: [
        { id: 'opt_1', text: '', mathTex: '3' },
        { id: 'opt_2', text: '', mathTex: '5' },
        { id: 'opt_3', text: '', mathTex: '2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'y(0) = C + 2 = 5، إذن C = 3.',
      explanationMath: 'C = 3'
    },
    {
      id: 'dae-q4',
      conceptId: 'differential-equations-ay-b',
      questionNumber: 4,
      questionText: "الحل الخاص الثابت للمعادلة y' = -3y + 6 هو:",
      questionMath: "y' = -3y + 6",
      options: [
        { id: 'opt_1', text: '', mathTex: 'y = 2' },
        { id: 'opt_2', text: '', mathTex: 'y = -2' },
        { id: 'opt_3', text: '', mathTex: 'y = 6' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'y_p = -b/a = -6/(-3) = 2.',
      explanationMath: 'y_p = 2'
    },
    {
      id: 'dae-q5',
      conceptId: 'differential-equations-ay-b',
      questionNumber: 5,
      questionText: 'إذا كان الحل العام y = Ce^(-3x) + 2 ويحقق y(0) = 1، فإن قيمة C هي:',
      questionMath: 'y(0) = 1',
      options: [
        { id: 'opt_1', text: '', mathTex: '-1' },
        { id: 'opt_2', text: '', mathTex: '1' },
        { id: 'opt_3', text: '', mathTex: '3' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'y(0) = C + 2 = 1، إذن C = -1.',
      explanationMath: 'C = -1'
    },
    {
      id: 'dae-q6',
      conceptId: 'differential-equations-ay-b',
      questionNumber: 6,
      questionText: 'الحل العام للمعادلة التفاضلية y\' = y (حيث a = 1، b = 0) هو:',
      questionMath: "y' = y",
      options: [
        { id: 'opt_1', text: '', mathTex: 'y = Ce^{x}' },
        { id: 'opt_2', text: '', mathTex: 'y = Cx' },
        { id: 'opt_3', text: '', mathTex: 'y = C + x' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الحل العام للمعادلة y\' = ay هو y = Ce^(ax)، وهنا a = 1.',
      explanationMath: 'y = Ce^x'
    },
    {
      id: 'dae-q7',
      conceptId: 'differential-equations-ay-b',
      questionNumber: 7,
      questionText: 'الحل الخاص الثابت للمعادلة y\' = -y + 3 هو:',
      questionMath: "y' = -y + 3",
      options: [
        { id: 'opt_1', text: '', mathTex: 'y = 3' },
        { id: 'opt_2', text: '', mathTex: 'y = -3' },
        { id: 'opt_3', text: '', mathTex: 'y = 1' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'y_p = -b/a = -3/(-1) = 3.',
      explanationMath: 'y_p = 3'
    },
    {
      id: 'dae-q8',
      conceptId: 'differential-equations-ay-b',
      questionNumber: 8,
      questionText: 'الحل الخاص للمعادلة y\' = 4y الذي يحقق y(0) = 2 هو:',
      questionMath: "y' = 4y, \\; y(0) = 2",
      options: [
        { id: 'opt_1', text: '', mathTex: 'y = 2e^{4x}' },
        { id: 'opt_2', text: '', mathTex: 'y = 4e^{2x}' },
        { id: 'opt_3', text: '', mathTex: 'y = 2e^{2x}' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الحل العام y = Ce^(4x)، ومن y(0) = C = 2 نحصل على y = 2e^(4x).',
      explanationMath: 'y(x) = 2e^{4x}'
    },
    {
      id: 'dae-q9',
      conceptId: 'differential-equations-ay-b',
      questionNumber: 9,
      questionText: 'أي معادلة تفاضلية من الشكل y\' = ay (بدون حد ثابت) تكون حلولها العامة على الشكل:',
      questionMath: "y' = ay",
      options: [
        { id: 'opt_1', text: '', mathTex: 'y = Ce^{ax}' },
        { id: 'opt_2', text: '', mathTex: 'y = Cx^a' },
        { id: 'opt_3', text: '', mathTex: 'y = C + ax' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الحل العام للمعادلة المتجانسة y\' = ay هو دائماً y = Ce^(ax).',
      explanationMath: 'y = Ce^{ax}'
    },
    {
      id: 'dae-q10',
      conceptId: 'differential-equations-ay-b',
      questionNumber: 10,
      questionText: 'إذا كان الحل العام للمعادلة y\' = 5y - 10 هو y = Ce^(5x) + 2 ويحقق y(0) = 4، فإن قيمة C هي:',
      questionMath: 'y(0) = 4',
      options: [
        { id: 'opt_1', text: '', mathTex: '2' },
        { id: 'opt_2', text: '', mathTex: '4' },
        { id: 'opt_3', text: '', mathTex: '-2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'y(0) = C + 2 = 4، إذن C = 2.',
      explanationMath: 'C = 2'
    }
  ],

  // 18. العمليات على النهايات ونهاية دالة مركبة
  'limits-operations-composite': [
    {
      id: 'loc-q1',
      conceptId: 'limits-operations-composite',
      questionNumber: 1,
      questionText: 'نهاية الدالة (x²+3x)/x عندما x تؤول إلى 0 هي:',
      questionMath: '\\lim_{x \\to 0} \\frac{x^2+3x}{x}',
      options: [
        { id: 'opt_1', text: '', mathTex: '3' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '+\\infty' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'بتبسيط العبارة نحصل على x+3، ونهايتها عند x=0 هي 3.',
      explanationMath: '\\lim = 3'
    },
    {
      id: 'loc-q2',
      conceptId: 'limits-operations-composite',
      questionNumber: 2,
      questionText: 'نهاية الدالة 1/(x²-1) عندما x تؤول إلى +∞ هي:',
      questionMath: '\\lim_{x \\to +\\infty} \\frac{1}{x^2-1}',
      options: [
        { id: 'opt_1', text: '', mathTex: '0' },
        { id: 'opt_2', text: '', mathTex: '1' },
        { id: 'opt_3', text: '', mathTex: '+\\infty' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'x²-1 تؤول إلى +∞، ومقلوب عدد يؤول إلى +∞ يؤول إلى 0.',
      explanationMath: '\\lim = 0'
    },
    {
      id: 'loc-q3',
      conceptId: 'limits-operations-composite',
      questionNumber: 3,
      questionText: 'إذا كانت نهاية g(x) عند x₀ تساوي +∞، ونهاية f(t) عند +∞ تساوي 0، فإن نهاية (f∘g)(x) عند x₀ هي:',
      questionMath: '\\lim_{x \\to x_0} (f \\circ g)(x)',
      options: [
        { id: 'opt_1', text: '', mathTex: '0' },
        { id: 'opt_2', text: '', mathTex: '+\\infty' },
        { id: 'opt_3', text: 'غير موجودة' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'حسب مبرهنة نهاية الدالة المركبة، نهاية f∘g عند x₀ تساوي نهاية f عند +∞، أي 0.',
      explanationMath: '\\lim = 0'
    },
    {
      id: 'loc-q4',
      conceptId: 'limits-operations-composite',
      questionNumber: 4,
      questionText: 'إذا كانت نهاية كل من دالتين تؤول إلى +∞ عند نقطة ما، فإن نهاية مجموعهما عند تلك النقطة تساوي:',
      questionMath: '\\lim f = \\lim g = +\\infty',
      options: [
        { id: 'opt_1', text: '', mathTex: '+\\infty' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: 'شكل غير معين دائماً' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'مجموع نهايتين كلتاهما +∞ يساوي +∞ (ليس شكلاً غير معين).',
      explanationMath: '\\lim (f+g) = +\\infty'
    },
    {
      id: 'loc-q5',
      conceptId: 'limits-operations-composite',
      questionNumber: 5,
      questionText: 'الشكل ∞/∞ يعتبر:',
      questionMath: '\\frac{\\infty}{\\infty}',
      options: [
        { id: 'opt_1', text: 'شكلاً غير معين يتطلب معالجة خاصة' },
        { id: 'opt_2', text: 'يساوي دائماً 1' },
        { id: 'opt_3', text: 'يساوي دائماً 0' }
      ],
      correctOptionId: 'opt_1',
      explanation: '∞/∞ من الأشكال غير المعينة السبعة التي تتطلب تقنيات خاصة لحساب النهاية.',
      explanationMath: '\\frac{\\infty}{\\infty} \\; \\text{شكل غير معين}'
    },
    {
      id: 'loc-q6',
      conceptId: 'limits-operations-composite',
      questionNumber: 6,
      questionText: 'نهاية الدالة (x²-4)/(x-2) عندما x تؤول إلى 2 هي:',
      questionMath: '\\lim_{x \\to 2} \\frac{x^2-4}{x-2}',
      options: [
        { id: 'opt_1', text: '', mathTex: '4' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'بتحليل البسط: (x-2)(x+2)/(x-2) = x+2، ونهايته عند x=2 هي 4.',
      explanationMath: '\\lim = 4'
    },
    {
      id: 'loc-q7',
      conceptId: 'limits-operations-composite',
      questionNumber: 7,
      questionText: 'نهاية الدالة (2x²+x)/x عندما x تؤول إلى 0 هي:',
      questionMath: '\\lim_{x \\to 0} \\frac{2x^2+x}{x}',
      options: [
        { id: 'opt_1', text: '', mathTex: '1' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: '', mathTex: '2' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'بتبسيط العبارة نحصل على 2x+1، ونهايتها عند x=0 هي 1.',
      explanationMath: '\\lim = 1'
    },
    {
      id: 'loc-q8',
      conceptId: 'limits-operations-composite',
      questionNumber: 8,
      questionText: 'إذا كانت نهاية دالة عند نقطة تساوي +∞ ونهاية دالة أخرى عند نفس النقطة تساوي عدداً حقيقياً L، فإن نهاية مجموعهما هي:',
      questionMath: '\\lim f = +\\infty, \\; \\lim g = L',
      options: [
        { id: 'opt_1', text: '', mathTex: '+\\infty' },
        { id: 'opt_2', text: '', mathTex: 'L' },
        { id: 'opt_3', text: 'شكل غير معين' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'إضافة عدد حقيقي محدود إلى نهاية لانهائية لا تغير طبيعتها اللانهائية.',
      explanationMath: '\\lim (f+g) = +\\infty'
    },
    {
      id: 'loc-q9',
      conceptId: 'limits-operations-composite',
      questionNumber: 9,
      questionText: 'نهاية جداء دالة تؤول إلى 0 مع دالة تؤول إلى +∞ عند نفس النقطة تعتبر:',
      questionMath: '0 \\times \\infty',
      options: [
        { id: 'opt_1', text: 'شكلاً غير معين (0 × ∞)' },
        { id: 'opt_2', text: 'تساوي دائماً 0' },
        { id: 'opt_3', text: 'تساوي دائماً +∞' }
      ],
      correctOptionId: 'opt_1',
      explanation: '0 × ∞ من الأشكال غير المعينة السبعة التي تتطلب معالجة خاصة.',
      explanationMath: '0 \\times \\infty \\; \\text{شكل غير معين}'
    },
    {
      id: 'loc-q10',
      conceptId: 'limits-operations-composite',
      questionNumber: 10,
      questionText: 'إذا كانت نهاية g(x) عند x₀ تساوي 3، ونهاية f(t) عند 3 تساوي 7، فإن نهاية (f∘g)(x) عند x₀ هي:',
      questionMath: '\\lim_{x \\to x_0} (f \\circ g)(x)',
      options: [
        { id: 'opt_1', text: '', mathTex: '7' },
        { id: 'opt_2', text: '', mathTex: '3' },
        { id: 'opt_3', text: 'غير موجودة' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'حسب مبرهنة نهاية الدالة المركبة، نهاية f∘g عند x₀ تساوي نهاية f عند 3، أي 7.',
      explanationMath: '\\lim = 7'
    }
  ],

  // 19. مبرهنتا المقارنة والحصر
  'limits-comparison-squeeze': [
    {
      id: 'lcs-q1',
      conceptId: 'limits-comparison-squeeze',
      questionNumber: 1,
      questionText: 'نهاية الدالة sin(x)/x عندما x تؤول إلى +∞ هي:',
      questionMath: '\\lim_{x \\to +\\infty} \\frac{\\sin(x)}{x}',
      options: [
        { id: 'opt_1', text: '', mathTex: '0' },
        { id: 'opt_2', text: '', mathTex: '1' },
        { id: 'opt_3', text: '', mathTex: '+\\infty' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الدالة محصورة بين -1/x و1/x اللتين تؤولان إلى 0 عند +∞.',
      explanationMath: '\\lim = 0'
    },
    {
      id: 'lcs-q2',
      conceptId: 'limits-comparison-squeeze',
      questionNumber: 2,
      questionText: 'تُستعمل مبرهنة الحصر عندما تكون الدالة:',
      questionMath: 'g(x) \\leq f(x) \\leq h(x)',
      options: [
        { id: 'opt_1', text: 'محصورة بين دالتين لهما نفس النهاية عند نقطة معينة' },
        { id: 'opt_2', text: 'متزايدة تماما فقط' },
        { id: 'opt_3', text: 'متصلة فقط' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'مبرهنة الحصر تنطبق عندما تنحصر الدالة بين حدين يؤولان لنفس النهاية.',
      explanationMath: '\\lim g = \\lim h \\implies \\lim f'
    },
    {
      id: 'lcs-q3',
      conceptId: 'limits-comparison-squeeze',
      questionNumber: 3,
      questionText: 'إذا كان 2x-1 ≤ f(x) ≤ 2x+1 من أجل x كبيرة بما فيه الكفاية، فإن نهاية f(x)/x عند +∞ هي:',
      questionMath: '2x-1 \\leq f(x) \\leq 2x+1',
      options: [
        { id: 'opt_1', text: '', mathTex: '2' },
        { id: 'opt_2', text: '', mathTex: '1' },
        { id: 'opt_3', text: '', mathTex: '0' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'بقسمة التأطير على x نحصل على حدين يؤولان إلى 2.',
      explanationMath: '\\lim \\frac{f(x)}{x} = 2'
    },
    {
      id: 'lcs-q4',
      conceptId: 'limits-comparison-squeeze',
      questionNumber: 4,
      questionText: 'إذا كانت f(x) ≥ g(x) بجوار +∞ وكانت نهاية g(x) عند +∞ تساوي +∞، فإن نهاية f(x) عند +∞ هي:',
      questionMath: 'f(x) \\geq g(x)',
      options: [
        { id: 'opt_1', text: '', mathTex: '+\\infty' },
        { id: 'opt_2', text: '', mathTex: '0' },
        { id: 'opt_3', text: 'غير موجودة' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'حسب مبرهنة المقارنة، إذا كانت f أكبر من دالة تؤول إلى +∞ فهي بدورها تؤول إلى +∞.',
      explanationMath: '\\lim f = +\\infty'
    },
    {
      id: 'lcs-q5',
      conceptId: 'limits-comparison-squeeze',
      questionNumber: 5,
      questionText: 'التأطير -1 ≤ cos(x) ≤ 1 يُستعمل غالباً لحصر عبارات تحتوي على:',
      questionMath: '-1 \\leq \\cos(x) \\leq 1',
      options: [
        { id: 'opt_1', text: '', mathTex: '\\cos(x)' },
        { id: 'opt_2', text: '', mathTex: 'e^x' },
        { id: 'opt_3', text: '', mathTex: '\\ln(x)' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'هذا التأطير خاص بدالة الجيب تمام cos(x) وهو الأساس لتطبيق مبرهنة الحصر عليها.',
      explanationMath: '-1 \\leq \\cos(x) \\leq 1'
    },
    {
      id: 'lcs-q6',
      conceptId: 'limits-comparison-squeeze',
      questionNumber: 6,
      questionText: 'باستعمال التأطير -x² ≤ x²sin(1/x²) ≤ x²، نهاية الدالة x²sin(1/x²) عندما x تؤول إلى 0 هي:',
      questionMath: '-x^2 \\leq x^2\\sin(1/x^2) \\leq x^2',
      options: [
        { id: 'opt_1', text: '', mathTex: '0' },
        { id: 'opt_2', text: '', mathTex: '1' },
        { id: 'opt_3', text: '', mathTex: '+\\infty' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'الحدان المحيطان -x² و x² يؤولان كلاهما إلى 0 عند x → 0، فالدالة محصورة بينهما تؤول أيضاً إلى 0.',
      explanationMath: '\\lim = 0'
    },
    {
      id: 'lcs-q7',
      conceptId: 'limits-comparison-squeeze',
      questionNumber: 7,
      questionText: 'إذا كانت -x² ≤ f(x) ≤ x² بجوار 0، فإن نهاية f(x) عندما x تؤول إلى 0 هي:',
      questionMath: '-x^2 \\leq f(x) \\leq x^2',
      options: [
        { id: 'opt_1', text: '', mathTex: '0' },
        { id: 'opt_2', text: '', mathTex: '+\\infty' },
        { id: 'opt_3', text: 'غير موجودة' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'كلا الحدين المحيطين يؤولان إلى 0 عند x → 0، فبمبرهنة الحصر تؤول f(x) أيضاً إلى 0.',
      explanationMath: '\\lim = 0'
    },
    {
      id: 'lcs-q8',
      conceptId: 'limits-comparison-squeeze',
      questionNumber: 8,
      questionText: 'تختلف مبرهنة المقارنة عن مبرهنة الحصر في أن المقارنة تستعمل:',
      questionMath: 'f(x) \\geq g(x)',
      options: [
        { id: 'opt_1', text: 'تأطيراً من جهة واحدة فقط (حد واحد للمقارنة)' },
        { id: 'opt_2', text: 'تأطيراً من الجهتين دائماً' },
        { id: 'opt_3', text: 'لا تحتاج إلى أي تأطير' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'مبرهنة المقارنة تعتمد على مقارنة الدالة بحد واحد فقط (من فوق أو من تحت)، بخلاف الحصر الذي يستعمل حدين.',
      explanationMath: 'f(x) \\geq g(x)'
    },
    {
      id: 'lcs-q9',
      conceptId: 'limits-comparison-squeeze',
      questionNumber: 9,
      questionText: 'إذا كانت f(x) ≤ g(x) بجوار -∞ وكانت نهاية g(x) عند -∞ تساوي -∞، فإن نهاية f(x) عند -∞ هي:',
      questionMath: 'f(x) \\leq g(x)',
      options: [
        { id: 'opt_1', text: '', mathTex: '-\\infty' },
        { id: 'opt_2', text: '', mathTex: '+\\infty' },
        { id: 'opt_3', text: '', mathTex: '0' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'حسب مبرهنة المقارنة، إذا كانت f أصغر من دالة تؤول إلى -∞ فهي بدورها تؤول إلى -∞.',
      explanationMath: '\\lim f = -\\infty'
    },
    {
      id: 'lcs-q10',
      conceptId: 'limits-comparison-squeeze',
      questionNumber: 10,
      questionText: 'عند تطبيق مبرهنة الحصر لإيجاد نهاية عبارة تحتوي على sin(x) أو cos(x) مقسومة على x^n (حيث n ≥ 1) عندما x تؤول إلى +∞، تكون النهاية دائماً:',
      questionMath: '\\frac{\\sin(x)}{x^n}, \\; n \\geq 1',
      options: [
        { id: 'opt_1', text: '', mathTex: '0' },
        { id: 'opt_2', text: '', mathTex: '1' },
        { id: 'opt_3', text: '', mathTex: '+\\infty' }
      ],
      correctOptionId: 'opt_1',
      explanation: 'بما أن sin(x) و cos(x) محصورتان بين -1 و1، فالعبارة تؤول دائماً إلى 0 عند تقسيمها على x^n المتزايدة إلى ما لا نهاية.',
      explanationMath: '\\lim = 0'
    }
  ]
};
