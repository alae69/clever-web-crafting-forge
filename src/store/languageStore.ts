
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'ar' | 'fr';

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<Language, Record<string, string>>;
  t: (key: string) => string;
}

// Expanded translations for the entire site
const translations = {
  en: {
    // Navbar
    home: 'Home',
    girls: 'Girls',
    boys: 'Boys',
    baby: 'Baby',
    ourStores: 'Our Stores',
    adminDashboard: 'Admin Dashboard',
    adminLogin: 'Admin Login',
    searchProducts: 'Search products...',
    search: 'Search',
    addToBag: 'added to your bag!',
    outOfStock: 'Out of Stock',
    english: 'English',
    arabic: 'العربية',
    french: 'Français',
    
    // Hero
    summerCollection: 'Summer Collection',
    summerDiscount: 'Special 20% discount on all new arrivals',
    shopNow: 'Shop Now',
    
    // Categories
    exploreCollections: 'Explore Collections',
    discoverLatestAdditions: 'Discover our latest additions for your little ones',
    girlsCollection: 'Girls Collection',
    girlsDescription: 'Explore our beautiful selection of girls\' clothing, featuring traditional Moroccan patterns and modern designs.',
    boysCollection: 'Boys Collection',
    boysDescription: 'Discover our stylish and comfortable boys\' clothing, made with high-quality fabrics and authentic designs.',
    babyCollection: 'Baby Collection',
    babyDescription: 'Gentle fabrics and adorable designs for your little ones, perfect for comfort and style.',
    viewAllProducts: 'View All Products',
    
    // Products
    stockQuantity: 'Stock Quantity',
    inStock: 'In Stock',
    onlyFewLeft: 'Only {count} left',
    
    // Testimonials
    testimonialTitle: 'What Our Customers Say',
    testimonialManagement: 'Testimonial Management',
    addNewTestimonial: 'Add New Testimonial',
    image: 'Image',
    name: 'Name',
    location: 'Location',
    rating: 'Rating',
    text: 'Text',
    actions: 'Actions',
    
    // Benefits
    freeShipping: 'Free Shipping',
    freeShippingDesc: 'Free nationwide shipping on all orders over 500 MAD',
    superiorQuality: 'Superior Quality',
    superiorQualityDesc: 'Made with premium materials for long-lasting comfort',
    easyReturns: 'Easy Returns',
    easyReturnsDesc: '30-day hassle-free return & exchange policy',
    customerSupport: '24/7 Support',
    customerSupportDesc: 'Dedicated customer service for all your queries',
    
    // Cart
    yourCart: 'Your Shopping Cart',
    cartEmpty: 'Your cart is empty',
    cartEmptyMessage: 'Looks like you haven\'t added any products to your cart yet.',
    startShopping: 'Start Shopping',
    cartItems: 'Cart Items',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    total: 'Total',
    proceedToCheckout: 'Proceed to Checkout',
    sizeGuide: 'Size Guide',
    shippingAndReturns: 'Shipping & Returns',
    
    // Login
    username: 'Username',
    password: 'Password',
    login: 'Login',
    enterUsername: 'Enter your username',
    enterPassword: 'Enter your password',
    loginSuccessful: 'Login successful!',
    invalidCredentials: 'Invalid username or password',
    adminPanel: 'Admin Panel',
    loginCredentialsPrompt: 'Enter your credentials to access the admin panel',
    protectedAreaWarning: 'Protected area. Unauthorized access is prohibited.',
    
    // New Arrivals
    newArrivals: 'New Arrivals',
    checkOutLatestAdditions: 'Check out our latest additions to the NajihKids collection.',
    searchResultsFor: 'Search results for',
    itemsFound: 'items found',
    noProductsFound: 'No products found matching your search.',
    viewAllNewArrivals: 'View All New Arrivals',
    exploreMoreCollections: 'Explore our complete collection of high-quality children\'s clothing and accessories.',
    
    // Sale
    saleItems: 'Sale Items',
    specialOffers: 'Special offers on selected items - Limited time only!',
    viewAllSaleItems: 'View All Sale Items',
    continueShopping: 'Continue Shopping',
    
    // Shipping & Returns
    shippingDetails: 'Shipping Details',
    freeShippingThreshold: 'On all orders over 500 MAD',
    standardShipping: 'Standard Shipping',
    standardShippingTime: '3-5 business days',
    expressShipping: 'Express Shipping',
    expressShippingTime: '1-2 business days',
    internationalShipping: 'International Shipping',
    internationalShippingTime: '7-14 business days',
    returnsPolicy: 'Returns Policy',
    returnsAccepted: 'Returns accepted within 30 days of purchase',
    returnsCondition: 'Items must be unworn, unwashed, and with original tags attached',
    returnShipping: 'Return shipping is the responsibility of the customer unless the item is defective',
    refundProcessing: 'Refunds will be processed within 7 business days of receiving the return',
    
    // About
    aboutUs: 'About Us',
    
    // Careers
    careers: 'Careers',
    openPositions: 'Open Positions',
    storeManager: 'Store Manager',
    rabat: 'Rabat',
    storeManagerDesc: 'We are looking for an experienced retail manager to lead our new store in Rabat.',
    fashionDesigner: 'Fashion Designer - Junior',
    fashionDesignerDesc: 'Join our creative team and help design our next children\'s clothing collection.',
    ecommerceSpecialist: 'E-commerce Specialist',
    ecommerceSpecialistDesc: 'Help us grow our online presence and manage our digital storefront.',
    applyNow: 'Apply Now',
    
    // Sustainability
    sustainability: 'Sustainability',
    
    // FAQ
    faq: 'Frequently Asked Questions',
    generalQuestions: 'General Questions',
    ordersAndShipping: 'Orders & Shipping',
    returnsAndExchanges: 'Returns & Exchanges',
    productCare: 'Product Care',
    trackOrder: 'Track Order',
    
    // FAQ Questions
    faqGeneral1Question: 'What makes NajihKids clothing special?',
    faqGeneral1Answer: 'NajihKids combines traditional Moroccan craftsmanship with modern design to create unique, comfortable, and stylish clothing for children. Our garments are made with high-quality materials that are gentle on your child\'s skin while being durable enough to withstand active play and frequent washing.',
    faqGeneral2Question: 'What age groups do you cater to?',
    faqGeneral2Answer: 'We offer clothing for babies (0-24 months), toddlers (2-4 years), and children (4-12 years). Our size guide can help you find the perfect fit for your child.',
    faqGeneral3Question: 'Are your clothes suitable for sensitive skin?',
    faqGeneral3Answer: 'Yes! We carefully select fabrics that are gentle on sensitive skin. Many of our products are made from organic cotton and natural materials to minimize the risk of skin irritation.',
    
    faqOrders1Question: 'How can I track my order?',
    faqOrders1Answer: 'Once your order ships, you will receive a confirmation email with tracking information. You can also track your order anytime by visiting our',
    faqOrders1AnswerCont: 'page and entering your order number.',
    faqOrders2Question: 'How long does shipping take?',
    faqOrders2Answer: 'Standard shipping within Morocco takes 3-5 business days. Express shipping is available for 1-2 business day delivery. For more details, please visit our',
    faqOrders2AnswerCont: 'page.',
    faqOrders3Question: 'Do you offer international shipping?',
    faqOrders3Answer: 'Currently, we only ship within Morocco. We\'re working on expanding our shipping options to international destinations in the near future. Sign up for our newsletter to stay updated.',
    
    faqReturns1Question: 'What is your return policy?',
    faqReturns1Answer: 'We offer a 30-day return policy. Items must be unworn, with original tags and packaging. For complete details, please visit our',
    faqReturns1AnswerCont: 'page.',
    faqReturns2Question: 'How do I exchange an item for a different size?',
    faqReturns2Answer: 'For exchanges, we recommend returning the original item for a refund and placing a new order for the desired size. This ensures you get the correct size as quickly as possible, especially if the size you need is at risk of selling out.',
    faqReturns3Question: 'How long does it take to process a refund?',
    faqReturns3Answer: 'Once we receive your return, it typically takes 2-3 business days to process. After processing, refunds will appear in your account within 5-7 business days, depending on your payment method and financial institution.',
    
    faqCare1Question: 'How should I wash NajihKids clothing?',
    faqCare1Answer: 'We recommend machine washing our clothing in cold water with similar colors and using a gentle cycle. Avoid using bleach or harsh detergents. For detailed care instructions for specific items, please refer to the care label on each garment.',
    faqCare2Question: 'Can I iron NajihKids clothing?',
    faqCare2Answer: 'Yes, most of our clothing can be ironed on a low to medium setting. For garments with embroidery or special details, we recommend ironing inside out to protect these features. Always check the care label for specific instructions.',
    faqCare3Question: 'How can I maintain the quality of the clothes?',
    faqCare3Answer: 'To maintain the quality of your NajihKids clothing, we recommend washing in cold water, avoiding bleach or harsh detergents, and air-drying when possible. For stain removal, treat the stain promptly with a gentle stain remover before washing.',
    
    // Product Listings
    category: 'Category',
    allCategories: 'All Categories',
    accessories: 'Accessories',
    sortBy: 'Sort by',
    default: 'Default',
    priceLowHigh: 'Price: Low to High',
    priceHighLow: 'Price: High to Low',
    newestFirst: 'Newest First',
    showing: 'Showing',
    products: 'products',
    tryDifferentSearch: 'Try a different search term or browse our categories.',
    tryDifferentCategory: 'Please try a different category or check back later.',
    
    // NotFound
    notFoundTitle: '404',
    notFoundMessage: 'Oops! Page not found',
    returnToHome: 'Return to Home'
  },
  ar: {
    // Navbar
    home: 'الرئيسية',
    girls: 'بنات',
    boys: 'أولاد',
    baby: 'أطفال',
    ourStores: 'متاجرنا',
    adminDashboard: 'لوحة الإدارة',
    adminLogin: 'تسجيل دخول المسؤول',
    searchProducts: 'البحث عن المنتجات...',
    search: 'بحث',
    addToBag: 'أضيف إلى حقيبتك!',
    outOfStock: 'غير متوفر',
    english: 'English',
    arabic: 'العربية',
    french: 'Français',
    
    // Hero
    summerCollection: 'مجموعة الصيف',
    summerDiscount: 'خصم خاص 20٪ على جميع الوصولات الجديدة',
    shopNow: 'تسوق الآن',
    
    // Categories
    exploreCollections: 'استكشف المجموعات',
    discoverLatestAdditions: 'اكتشف أحدث إضافاتنا لصغارك',
    girlsCollection: 'مجموعة البنات',
    girlsDescription: 'استكشفي مجموعتنا الجميلة من ملابس البنات، التي تتميز بأنماط مغربية تقليدية وتصاميم عصرية',
    boysCollection: 'مجموعة الأولاد',
    boysDescription: 'اكتشف ملابس الأولاد الأنيقة والمريحة لدينا، المصنوعة من أقمشة عالية الجودة وتصاميم أصيلة',
    babyCollection: 'مجموعة الأطفال',
    babyDescription: 'أقمشة لطيفة وتصاميم جذابة لصغارك، مثالية للراحة والأناقة',
    viewAllProducts: 'عرض جميع المنتجات',
    
    // Products
    stockQuantity: 'كمية المخزون',
    inStock: 'متوفر',
    onlyFewLeft: 'بقي {count} فقط',
    
    // Testimonials
    testimonialTitle: 'ماذا يقول عملاؤنا',
    testimonialManagement: 'إدارة الشهادات',
    addNewTestimonial: 'إضافة شهادة جديدة',
    image: 'صورة',
    name: 'الاسم',
    location: 'الموقع',
    rating: 'التقييم',
    text: 'النص',
    actions: 'إجراءات',
    
    // Benefits
    freeShipping: 'شحن مجاني',
    freeShippingDesc: 'شحن مجاني في جميع أنحاء البلاد على الطلبات التي تزيد عن 500 درهم',
    superiorQuality: 'جودة متفوقة',
    superiorQualityDesc: 'مصنوعة من مواد متميزة لراحة طويلة الأمد',
    easyReturns: 'إرجاع سهل',
    easyReturnsDesc: 'سياسة إرجاع واستبدال سهلة لمدة 30 يومًا',
    customerSupport: 'دعم على مدار الساعة',
    customerSupportDesc: 'خدمة عملاء مخصصة لجميع استفساراتك',
    
    // Cart
    yourCart: 'سلة تسوقك',
    cartEmpty: 'سلة التسوق فارغة',
    cartEmptyMessage: 'يبدو أنك لم تضف أي منتجات إلى سلة التسوق الخاصة بك حتى الآن.',
    startShopping: 'ابدأ التسوق',
    cartItems: 'عناصر السلة',
    subtotal: 'المجموع الفرعي',
    shipping: 'الشحن',
    free: 'مجاني',
    total: 'الإجمالي',
    proceedToCheckout: 'الانتقال إلى الدفع',
    sizeGuide: 'دليل المقاسات',
    shippingAndReturns: 'الشحن والإرجاع',
    
    // Login
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    login: 'تسجيل الدخول',
    enterUsername: 'أدخل اسم المستخدم',
    enterPassword: 'أدخل كلمة المرور',
    loginSuccessful: 'تم تسجيل الدخول بنجاح!',
    invalidCredentials: 'اسم المستخدم أو كلمة المرور غير صحيحة',
    adminPanel: 'لوحة الإدارة',
    loginCredentialsPrompt: 'أدخل بيانات اعتمادك للوصول إلى لوحة الإدارة',
    protectedAreaWarning: 'منطقة محمية. الوصول غير المصرح به محظور.',
    
    // New Arrivals
    newArrivals: 'الوصولات الجديدة',
    checkOutLatestAdditions: 'تحقق من أحدث الإضافات لدينا في مجموعة ناجح كيدز.',
    searchResultsFor: 'نتائج البحث عن',
    itemsFound: 'عنصر تم العثور عليه',
    noProductsFound: 'لم يتم العثور على منتجات تطابق بحثك.',
    viewAllNewArrivals: 'عرض جميع الوصولات الجديدة',
    
    // Sale
    saleItems: 'عناصر التخفيضات',
    specialOffers: 'عروض خاصة على عناصر مختارة - لفترة محدودة فقط!',
    viewAllSaleItems: 'عرض كل عناصر التخفيضات',
    continueShopping: 'مواصلة التسوق',
    
    // Shipping & Returns
    shippingDetails: 'تفاصيل الشحن',
    freeShippingThreshold: 'على جميع الطلبات التي تزيد عن 500 درهم',
    standardShipping: 'الشحن القياسي',
    standardShippingTime: '3-5 أيام عمل',
    expressShipping: 'الشحن السريع',
    expressShippingTime: '1-2 يوم عمل',
    internationalShipping: 'الشحن الدولي',
    internationalShippingTime: '7-14 يوم عمل',
    returnsPolicy: 'سياسة الإرجاع',
    returnsAccepted: 'يُقبل الإرجاع في غضون 30 يومًا من الشراء',
    returnsCondition: 'يجب أن تكون العناصر غير ملبوسة وغير مغسولة ومع العلامات الأصلية مرفقة',
    returnShipping: 'تكون مسؤولية شحن الإرجاع على العميل ما لم يكن العنصر معيبًا',
    refundProcessing: 'سيتم معالجة المبالغ المستردة في غضون 7 أيام عمل من استلام الإرجاع',
    
    // About
    aboutUs: 'معلومات عنا',
    
    // Careers
    careers: 'وظائف',
    openPositions: 'الوظائف المتاحة',
    storeManager: 'مدير المتجر',
    rabat: 'الرباط',
    storeManagerDesc: 'نبحث عن مدير متجر ذو خبرة لقيادة متجرنا الجديد في الرباط.',
    fashionDesigner: 'مصمم أزياء - مبتدئ',
    fashionDesignerDesc: 'انضم إلى فريقنا الإبداعي وساعد في تصميم مجموعة ملابس الأطفال القادمة.',
    ecommerceSpecialist: 'متخصص في التجارة الإلكترونية',
    ecommerceSpecialistDesc: 'ساعدنا في تنمية وجودنا عبر الإنترنت وإدارة واجهة متجرنا الرقمية.',
    applyNow: 'قدم الآن',
    
    // Sustainability
    sustainability: 'الاستدامة',
    
    // FAQ
    faq: 'الأسئلة الشائعة',
    generalQuestions: 'أسئلة عامة',
    ordersAndShipping: 'الطلبات والشحن',
    returnsAndExchanges: 'الإرجاع والاستبدال',
    productCare: 'العناية بالمنتج',
    trackOrder: 'تتبع الطلب',
    
    // FAQ Questions
    faqGeneral1Question: 'ما الذي يميز ملابس ناجح كيدز؟',
    faqGeneral1Answer: 'تجمع ناجح كيدز بين الحرف المغربية التقليدية والتصميم الحديث لإنشاء ملابس فريدة ومريحة وأنيقة للأطفال. منتجاتنا مصنوعة من مواد عالية الجودة لطيفة على بشرة طفلك مع كونها متينة بما يكفي لتحمل اللعب النشط والغسيل المتكرر.',
    faqGeneral2Question: 'ما هي الفئات العمرية التي تستهدفونها؟',
    faqGeneral2Answer: 'نقدم ملابس للأطفال الرضع (0-24 شهرًا)، والأطفال الصغار (2-4 سنوات)، والأطفال (4-12 سنة). يمكن أن يساعدك دليل المقاسات في العثور على المقاس المثالي لطفلك.',
    faqGeneral3Question: 'هل ملابسكم مناسبة للبشرة الحساسة؟',
    faqGeneral3Answer: 'نعم! نختار بعناية الأقمشة اللطيفة على البشرة الحساسة. العديد من منتجاتنا مصنوعة من القطن العضوي والمواد الطبيعية لتقليل مخاطر تهيج الجلد.',
    
    faqOrders1Question: 'كيف يمكنني تتبع طلبي؟',
    faqOrders1Answer: 'بمجرد شحن طلبك، ستتلقى رسالة بريد إلكتروني للتأكيد مع معلومات التتبع. يمكنك أيضًا تتبع طلبك في أي وقت عن طريق زيارة صفحة',
    faqOrders1AnswerCont: 'وإدخال رقم طلبك.',
    faqOrders2Question: 'كم من الوقت يستغرق الشحن؟',
    faqOrders2Answer: 'يستغرق الشحن القياسي داخل المغرب 3-5 أيام عمل. يتوفر الشحن السريع للتسليم خلال 1-2 يوم عمل. لمزيد من التفاصيل، يرجى زيارة صفحة',
    faqOrders2AnswerCont: '.',
    faqOrders3Question: 'هل تقدمون الشحن الدولي؟',
    faqOrders3Answer: 'حاليًا، نحن نشحن فقط داخل المغرب. نحن نعمل على توسيع خيارات الشحن لدينا إلى وجهات دولية في المستقبل القريب. اشترك في نشرتنا الإخبارية للبقاء على اطلاع.',
    
    faqReturns1Question: 'ما هي سياسة الإرجاع لديكم؟',
    faqReturns1Answer: 'نقدم سياسة إرجاع لمدة 30 يومًا. يجب أن تكون العناصر غير ملبوسة، مع العلامات والعبوات الأصلية. للحصول على تفاصيل كاملة، يرجى زيارة صفحة',
    faqReturns1AnswerCont: '.',
    faqReturns2Question: 'كيف يمكنني استبدال عنصر بحجم مختلف؟',
    faqReturns2Answer: 'للاستبدال، نوصي بإرجاع العنصر الأصلي للاسترداد وتقديم طلب جديد للحجم المطلوب. هذا يضمن حصولك على الحجم الصحيح في أسرع وقت ممكن، خاصة إذا كان الحجم الذي تحتاجه معرضًا لخطر النفاد.',
    faqReturns3Question: 'كم من الوقت يستغرق معالجة المبلغ المستردة؟',
    faqReturns3Answer: 'بمجرد استلامنا للإرجاع، يستغرق الأمر عادة 2-3 أيام عمل للمعالجة. بعد المعالجة، ستظهر المبالغ المستردة في حسابك في غضون 5-7 أيام عمل، اعتمادًا على طريقة الدفع والمؤسسة المالية.',
    
    faqCare1Question: 'كيف يجب أن أغسل ملابس ناجح كيدز؟',
    faqCare1Answer: 'نوصي بغسل ملابسنا في الغسالة بالماء البارد مع ألوان متشابهة واستخدام دورة لطيفة. تجنب استخدام المبيض أو المنظفات القاسية. للحصول على تعليمات العناية التفصيلية لعناصر محددة، يرجى الرجوع إلى ملصق العناية على كل قطعة ملابس.',
    faqCare2Question: 'هل يمكنني كي ملابس ناجح كيدز؟',
    faqCare2Answer: 'نعم، يمكن كي معظم ملابسنا على إعداد منخفض إلى متوسط. بالنسبة للملابس ذات التطريز أو التفاصيل الخاصة، نوصي بالكي من الداخل للخارج لحماية هذه الميزات. تحقق دائمًا من ملصق العناية للحصول على تعليمات محددة.',
    faqCare3Question: 'كيف يمكنني الحفاظ على جودة الملابس؟',
    faqCare3Answer: 'للحفاظ على جودة ملابس ناجح كيدز، نوصي بالغسيل بالماء البارد، وتجنب المبيض أو المنظفات القاسية، والتجفيف الهوائي عند الإمكان. لإزالة البقع، عالج البقعة فورًا بمزيل بقع لطيف قبل الغسيل.',
    
    // Product Listings
    category: 'الفئة',
    allCategories: 'كل الفئات',
    accessories: 'إكسسوارات',
    sortBy: 'ترتيب حسب',
    default: 'افتراضي',
    priceLowHigh: 'السعر: من الأقل إلى الأعلى',
    priceHighLow: 'السعر: من الأعلى إلى الأقل',
    newestFirst: 'الأحدث أولاً',
    showing: 'عرض',
    products: 'منتجات',
    tryDifferentSearch: 'جرب مصطلح بحث مختلف أو تصفح فئاتنا.',
    tryDifferentCategory: 'الرجاء تجربة فئة مختلفة أو التحقق مرة أخرى لاحقًا.',
    
    // NotFound
    notFoundTitle: '404',
    notFoundMessage: 'عذراً! الصفحة غير موجودة',
    returnToHome: 'العودة إلى الصفحة الرئيسية'
  },
  fr: {
    // Navbar
    home: 'Accueil',
    girls: 'Filles',
    boys: 'Garçons',
    baby: 'Bébé',
    ourStores: 'Nos Magasins',
    adminDashboard: 'Dashboard Admin',
    adminLogin: 'Connexion Admin',
    searchProducts: 'Rechercher des produits...',
    search: 'Rechercher',
    addToBag: 'ajouté à votre panier!',
    outOfStock: 'En Rupture de Stock',
    english: 'English',
    arabic: 'العربية',
    french: 'Français',
    
    // Hero
    summerCollection: 'Collection d\'Été',
    summerDiscount: 'Réduction spéciale de 20% sur toutes les nouveautés',
    shopNow: 'Acheter Maintenant',
    
    // Categories
    exploreCollections: 'Explorer les Collections',
    discoverLatestAdditions: 'Découvrez nos dernières collections pour vos petits',
    girlsCollection: 'Collection Filles',
    girlsDescription: 'Explorez notre belle sélection de vêtements pour filles, avec des motifs marocains traditionnels et des designs modernes',
    boysCollection: 'Collection Garçons',
    boysDescription: 'Découvrez nos vêtements pour garçons élégants et confortables, fabriqués avec des tissus de haute qualité et des designs authentiques',
    babyCollection: 'Collection Bébé',
    babyDescription: 'Des tissus doux et des designs adorables pour vos petits, parfaits pour le confort et le style',
    viewAllProducts: 'Voir Tous les Produits',
    
    // Products
    stockQuantity: 'Quantité en Stock',
    inStock: 'En Stock',
    onlyFewLeft: 'Seulement {count} restants',
    
    // Testimonials
    testimonialTitle: 'Ce Que Disent Nos Clients',
    testimonialManagement: 'Gestion des Témoignages',
    addNewTestimonial: 'Ajouter un Nouveau Témoignage',
    image: 'Image',
    name: 'Nom',
    location: 'Emplacement',
    rating: 'Évaluation',
    text: 'Texte',
    actions: 'Actions',
    
    // Benefits
    freeShipping: 'Livraison Gratuite',
    freeShippingDesc: 'Livraison gratuite à l\'échelle nationale sur toutes les commandes de plus de 500 MAD',
    superiorQuality: 'Qualité Supérieure',
    superiorQualityDesc: 'Fabriqués avec des matériaux premium pour un confort durable',
    easyReturns: 'Retours Faciles',
    easyReturnsDesc: 'Politique de retour et d\'échange sans tracas de 30 jours',
    customerSupport: 'Support 24/7',
    customerSupportDesc: 'Service client dédié pour toutes vos questions',
    
    // Cart
    yourCart: 'Votre Panier',
    cartEmpty: 'Votre panier est vide',
    cartEmptyMessage: 'Il semble que vous n\'ayez pas encore ajouté de produits à votre panier.',
    startShopping: 'Commencer les Achats',
    cartItems: 'Articles du Panier',
    subtotal: 'Sous-total',
    shipping: 'Livraison',
    free: 'Gratuite',
    total: 'Total',
    proceedToCheckout: 'Procéder au Paiement',
    sizeGuide: 'Guide des Tailles',
    shippingAndReturns: 'Livraison & Retours',
    
    // Login
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    login: 'Connexion',
    enterUsername: 'Entrez votre nom d\'utilisateur',
    enterPassword: 'Entrez votre mot de passe',
    loginSuccessful: 'Connexion réussie!',
    invalidCredentials: 'Nom d\'utilisateur ou mot de passe invalide',
    adminPanel: 'Panneau d\'Administration',
    loginCredentialsPrompt: 'Entrez vos identifiants pour accéder au panneau d\'administration',
    protectedAreaWarning: 'Zone protégée. Accès non autorisé interdit.',
    
    // New Arrivals
    newArrivals: 'Nouveautés',
    checkOutLatestAdditions: 'Découvrez nos derniers ajouts à la collection NajihKids.',
    searchResultsFor: 'Résultats de recherche pour',
    itemsFound: 'articles trouvés',
    noProductsFound: 'Aucun produit correspondant à votre recherche n\'a été trouvé.',
    viewAllNewArrivals: 'Voir Toutes les Nouveautés',
    exploreMoreCollections: 'Explorez notre collection complète de vêtements et accessoires pour enfants de haute qualité.',
    
    // Sale
    saleItems: 'Articles en Solde',
    specialOffers: 'Offres spéciales sur certains articles - Durée limitée uniquement!',
    viewAllSaleItems: 'Voir Tous les Articles en Solde',
    continueShopping: 'Continuer les Achats',
    
    // Shipping & Returns
    shippingDetails: 'Détails de Livraison',
    freeShippingThreshold: 'Sur toutes les commandes de plus de 500 MAD',
    standardShipping: 'Livraison Standard',
    standardShippingTime: '3-5 jours ouvrables',
    expressShipping: 'Livraison Express',
    expressShippingTime: '1-2 jours ouvrables',
    internationalShipping: 'Livraison Internationale',
    internationalShippingTime: '7-14 jours ouvrables',
    returnsPolicy: 'Politique de Retour',
    returnsAccepted: 'Retours acceptés dans les 30 jours suivant l\'achat',
    returnsCondition: 'Les articles doivent être non portés, non lavés et avec les étiquettes d\'origine attachées',
    returnShipping: 'Les frais de retour sont à la charge du client, sauf si l\'article est défectueux',
    refundProcessing: 'Les remboursements seront traités dans les 7 jours ouvrables suivant la réception du retour',
    
    // About
    aboutUs: 'À Propos',
    
    // Careers
    careers: 'Carrières',
    openPositions: 'Postes Ouverts',
    storeManager: 'Responsable de Magasin',
    rabat: 'Rabat',
    storeManagerDesc: 'Nous recherchons un responsable de magasin expérimenté pour diriger notre nouveau magasin à Rabat.',
    fashionDesigner: 'Designer de Mode - Junior',
    fashionDesignerDesc: 'Rejoignez notre équipe créative et aidez à concevoir notre prochaine collection de vêtements pour enfants.',
    ecommerceSpecialist: 'Spécialiste E-commerce',
    ecommerceSpecialistDesc: 'Aidez-nous à développer notre présence en ligne et à gérer notre vitrine numérique.',
    applyNow: 'Postuler Maintenant',
    
    // Sustainability
    sustainability: 'Durabilité',
    
    // FAQ
    faq: 'Questions Fréquemment Posées',
    generalQuestions: 'Questions Générales',
    ordersAndShipping: 'Commandes & Livraison',
    returnsAndExchanges: 'Retours & Échanges',
    productCare: 'Entretien des Produits',
    trackOrder: 'Suivre Commande',
    
    // FAQ Questions
    faqGeneral1Question: 'Qu\'est-ce qui rend les vêtements NajihKids spéciaux?',
    faqGeneral1Answer: 'NajihKids combine l\'artisanat traditionnel marocain avec un design moderne pour créer des vêtements uniques, confortables et élégants pour enfants. Nos vêtements sont fabriqués avec des matériaux de haute qualité qui sont doux pour la peau de votre enfant tout en étant assez durables pour résister à des jeux actifs et à des lavages fréquents.',
    faqGeneral2Question: 'À quels groupes d\'âge vous adressez-vous?',
    faqGeneral2Answer: 'Nous proposons des vêtements pour bébés (0-24 mois), tout-petits (2-4 ans) et enfants (4-12 ans). Notre guide des tailles peut vous aider à trouver la taille parfaite pour votre enfant.',
    faqGeneral3Question: 'Vos vêtements conviennent-ils aux peaux sensibles?',
    faqGeneral3Answer: 'Oui! Nous sélectionnons soigneusement des tissus doux pour les peaux sensibles. Beaucoup de nos produits sont fabriqués à partir de coton biologique et de matériaux naturels pour minimiser le risque d\'irritation de la peau.',
    
    faqOrders1Question: 'Comment puis-je suivre ma commande?',
    faqOrders1Answer: 'Une fois votre commande expédiée, vous recevrez un e-mail de confirmation avec les informations de suivi. Vous pouvez également suivre votre commande à tout moment en visitant notre page',
    faqOrders1AnswerCont: 'et en saisissant votre numéro de commande.',
    faqOrders2Question: 'Combien de temps dure la livraison?',
    faqOrders2Answer: 'La livraison standard au Maroc prend 3-5 jours ouvrables. La livraison express est disponible pour une livraison en 1-2 jours ouvrables. Pour plus de détails, veuillez visiter notre page',
    faqOrders2AnswerCont: '.',
    faqOrders3Question: 'Proposez-vous la livraison internationale?',
    faqOrders3Answer: 'Actuellement, nous n\'expédions qu\'au Maroc. Nous travaillons à élargir nos options d\'expédition vers des destinations internationales dans un avenir proche. Inscrivez-vous à notre newsletter pour rester informé.',
    
    faqReturns1Question: 'Quelle est votre politique de retour?',
    faqReturns1Answer: 'Nous offrons une politique de retour de 30 jours. Les articles doivent être non portés, avec les étiquettes et l\'emballage d\'origine. Pour des détails complets, veuillez visiter notre page',
    faqReturns1AnswerCont: '.',
    faqReturns2Question: 'Comment puis-je échanger un article contre une taille différente?',
    faqReturns2Answer: 'Pour les échanges, nous vous recommandons de retourner l\'article original pour un remboursement et de passer une nouvelle commande pour la taille souhaitée. Cela vous garantit d\'obtenir la bonne taille aussi rapidement que possible, surtout si la taille dont vous avez besoin risque d\'être épuisée.',
    faqReturns3Question: 'Combien de temps faut-il pour traiter un remboursement?',
    faqReturns3Answer: 'Une fois que nous recevons votre retour, il faut généralement 2-3 jours ouvrables pour le traiter. Après traitement, les remboursements apparaîtront sur votre compte dans les 5-7 jours ouvrables, selon votre mode de paiement et votre établissement financier.',
    
    faqCare1Question: 'Comment dois-je laver les vêtements NajihKids?',
    faqCare1Answer: 'Nous recommandons de laver nos vêtements en machine à l\'eau froide avec des couleurs similaires et d\'utiliser un cycle délicat. Évitez d\'utiliser de l\'eau de Javel ou des détergents agressifs. Pour des instructions d\'entretien détaillées pour des articles spécifiques, veuillez vous référer à l\'étiquette d\'entretien sur chaque vêtement.',
    faqCare2Question: 'Puis-je repasser les vêtements NajihKids?',
    faqCare2Answer: 'Oui, la plupart de nos vêtements peuvent être repassés à un réglage faible à moyen. Pour les vêtements avec broderie ou détails spéciaux, nous recommandons de repasser à l\'envers pour protéger ces caractéristiques. Vérifiez toujours l\'étiquette d\'entretien pour des instructions spécifiques.',
    faqCare3Question: 'Comment puis-je maintenir la qualité des vêtements?',
    faqCare3Answer: 'Pour maintenir la qualité de vos vêtements NajihKids, nous recommandons de les laver à l\'eau froide, d\'éviter l\'eau de Javel ou les détergents agressifs, et de les sécher à l\'air libre quand c\'est possible. Pour l\'élimination des taches, traitez la tache rapidement avec un détachant doux avant le lavage.',
    
    // Product Listings
    category: 'Catégorie',
    allCategories: 'Toutes les Catégories',
    accessories: 'Accessoires',
    sortBy: 'Trier par',
    default: 'Par défaut',
    priceLowHigh: 'Prix: Croissant',
    priceHighLow: 'Prix: Décroissant',
    newestFirst: 'Plus récent d\'abord',
    showing: 'Affichage de',
    products: 'produits',
    tryDifferentSearch: 'Essayez un terme de recherche différent ou parcourez nos catégories.',
    tryDifferentCategory: 'Veuillez essayer une catégorie différente ou vérifier plus tard.',
    
    // NotFound
    notFoundTitle: '404',
    notFoundMessage: 'Oups! Page non trouvée',
    returnToHome: 'Retourner à l\'accueil'
  }
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: 'en',
      translations,
      setLanguage: (language: Language) => set({ language }),
      t: (key: string) => {
        const { language, translations } = get();
        return translations[language][key] || key;
      }
    }),
    {
      name: 'language-storage',
    }
  )
);
