import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'agent71-language'
const supportedLanguages = ['en', 'fr', 'ar']

// Source copy stays in the components, which keeps product and legal content easy to
// review. This catalogue localizes every matching text node and accessibility label.
const entries = [
  ['Language', 'Langue', 'اللغة'],
  ['Agent 71 — Run your business, not your spreadsheets', 'Agent 71 — Pilotez votre entreprise, pas vos feuilles de calcul', 'Agent 71 — أدِر أعمالك، لا جداول البيانات'],
  ['Agent 71 is a modern freemium ERP by HikariTech for finance, sales, inventory, purchasing and electronic invoicing.', 'Agent 71 est un ERP freemium moderne de HikariTech pour la finance, les ventes, les stocks, les achats et la facturation électronique.', 'Agent 71 نظام ERP حديث بنموذج مجاني من HikariTech للمالية والمبيعات والمخزون والمشتريات والفوترة الإلكترونية.'],
  ['Agent 71 — Product scope', 'Agent 71 — Périmètre produit', 'Agent 71 — نطاق المنتج'],
  ['Explore the planned product scope for Agent 71, the modern ERP by HikariTech.', 'Découvrez le périmètre produit prévu pour Agent 71, l’ERP moderne de HikariTech.', 'استكشف نطاق المنتج المخطط لـ Agent 71، نظام ERP الحديث من HikariTech.'],
  ['Morocco e-invoicing — Agent 71', 'Facturation électronique au Maroc — Agent 71', 'الفوترة الإلكترونية في المغرب — Agent 71'],
  ["A clear guide to Morocco's developing electronic-invoicing framework and how Agent 71 is preparing for it.", 'Un guide clair du cadre marocain de facturation électronique en développement et de la préparation d’Agent 71.', 'دليل واضح لإطار الفوترة الإلكترونية المغربي قيد التطوير وكيف يستعد له Agent 71.'],
  ['Terms and conditions — Agent 71', 'Conditions générales — Agent 71', 'الشروط والأحكام — Agent 71'],
  ['Terms and conditions for the Agent 71 website by HikariTech.', 'Conditions générales du site Agent 71 de HikariTech.', 'الشروط والأحكام لموقع Agent 71 من HikariTech.'],
  ['Privacy policy — Agent 71', 'Politique de confidentialité — Agent 71', 'سياسة الخصوصية — Agent 71'],
  ['Privacy policy for the Agent 71 website by HikariTech.', 'Politique de confidentialité du site Agent 71 de HikariTech.', 'سياسة الخصوصية لموقع Agent 71 من HikariTech.'],
  ['Agent 71 home', 'Accueil Agent 71', 'الصفحة الرئيسية لـ Agent 71'],
  ['Back to Agent 71', 'Retour à Agent 71', 'العودة إلى Agent 71'],
  ['Contact us', 'Nous contacter', 'تواصل معنا'],
  ['Built by', 'Créé par', 'من تطوير'],
  ['Platform', 'Plateforme', 'المنصة'], ['Benefits', 'Avantages', 'المزايا'],
  ['E-invoicing', 'Facturation électronique', 'الفوترة الإلكترونية'], ['Modules', 'Modules', 'الوحدات'],
  ['Start free', 'Commencer gratuitement', 'ابدأ مجاناً'],
  ['Open navigation', 'Ouvrir la navigation', 'فتح قائمة التنقل'], ['Close navigation', 'Fermer la navigation', 'إغلاق قائمة التنقل'],
  ['Main navigation', 'Navigation principale', 'التنقل الرئيسي'],
  ['Run your', 'Pilotez votre', 'أدِر'], ['business.', 'entreprise.', 'أعمالك.'],
  ['Not your spreadsheets.', 'Pas vos feuilles de calcul.', 'لا جداول البيانات.'],
  ['Finance, sales, inventory and accounting—together in one modern ERP.', 'Finance, ventes, stocks et comptabilité, réunis dans un ERP moderne.', 'المالية والمبيعات والمخزون والمحاسبة، مجتمعة في نظام ERP حديث واحد.'],
  ['See the product', 'Voir le produit', 'شاهد المنتج'],
  ['Interactive Agent 71 dashboard preview', 'Aperçu interactif du tableau de bord Agent 71', 'معاينة تفاعلية للوحة تحكم Agent 71'],
  ['Dashboard navigation', 'Navigation du tableau de bord', 'التنقل في لوحة التحكم'],
  ['Home', 'Accueil', 'الرئيسية'], ['Dashboard', 'Tableau de bord', 'لوحة التحكم'], ['Sales', 'Ventes', 'المبيعات'],
  ['Purchases', 'Achats', 'المشتريات'], ['Inventory', 'Stocks', 'المخزون'], ['Accounting', 'Comptabilité', 'المحاسبة'],
  ['Visit HikariTech', 'Visiter HikariTech', 'زيارة HikariTech'],
  ['Good morning, Sara', 'Bonjour, Sara', 'صباح الخير، سارة'],
  ["Here’s what’s happening in your business today.", "Voici ce qui se passe aujourd’hui dans votre entreprise.", 'إليك ما يحدث في أعمالك اليوم.'],
  ['This month', 'Ce mois-ci', 'هذا الشهر'], ['This quarter', 'Ce trimestre', 'هذا الربع'], ['Today’s overview', 'Vue d’ensemble du jour', 'نظرة عامة على اليوم'],
  ['Cashflow', 'Trésorerie', 'التدفق النقدي'], ['Open invoices', 'Factures ouvertes', 'الفواتير المفتوحة'], ['Sales orders', 'Commandes clients', 'طلبات البيع'],
  ['+12.5% vs yesterday', '+12,5 % vs hier', '+12.5% مقارنة بالأمس'], ['+8.3% vs yesterday', '+8,3 % vs hier', '+8.3% مقارنة بالأمس'],
  ['18 invoices', '18 factures', '18 فاتورة'], ['Overdue', 'En retard', 'متأخرة'], ['Due this week', 'À échéance cette semaine', 'مستحقة هذا الأسبوع'], ['Due later', 'À échéance ultérieure', 'مستحقة لاحقاً'],
  ['View all invoices', 'Voir toutes les factures', 'عرض جميع الفواتير'], ['Inventory status', 'État du stock', 'حالة المخزون'],
  ['128 items across 6 categories', '128 articles dans 6 catégories', '128 صنفاً ضمن 6 فئات'], ['In stock', 'En stock', 'متوفر'], ['View inventory', 'Voir le stock', 'عرض المخزون'],
  ['Top selling items', 'Meilleures ventes', 'الأصناف الأكثر مبيعاً'], ['Wireless Headphones', 'Casque sans fil', 'سماعات لاسلكية'], ['Smart Watch', 'Montre connectée', 'ساعة ذكية'], ['Backpack', 'Sac à dos', 'حقيبة ظهر'],
  ['320 units', '320 unités', '320 وحدة'], ['210 units', '210 unités', '210 وحدات'], ['180 units', '180 unités', '180 وحدة'],
  ['Cashflow trend', 'Évolution de la trésorerie', 'اتجاه التدفق النقدي'],

  ['Everything your business needs', 'Tout ce dont votre entreprise a besoin', 'كل ما تحتاجه أعمالك'],
  ['to', 'pour', 'من أجل'], ['move faster.', 'avancer plus vite.', 'التحرك بشكل أسرع.'],
  ['See every number, connect every workflow, and turn insight into action.', 'Voyez chaque chiffre, reliez chaque processus et transformez les données en décisions.', 'شاهد كل رقم، واربط كل سير عمل، وحوّل الرؤية إلى إجراء.'],
  ['Product benefits', 'Avantages du produit', 'مزايا المنتج'], ['Visibility timeline chart', 'Chronologie de visibilité', 'مخطط زمني للرؤية'],
  ['START', 'DÉBUT', 'البداية'], ['ACTIVE', 'ACTIF', 'نشط'], ['PEAK', 'PIC', 'الذروة'], ['COMPLETE', 'TERMINÉ', 'مكتمل'],
  ['Instant Visibility', 'Visibilité instantanée', 'رؤية فورية'], ['Real-time data across your', 'Des données en temps réel pour toutes vos', 'بيانات لحظية عبر'], ['operations.', 'opérations.', 'عملياتك.'],
  ['How can I help you automate?', 'Que puis-je automatiser pour vous ?', 'كيف يمكنني مساعدتك في الأتمتة؟'],
  ['When a quote is approved, create the invoice,', 'Lorsqu’un devis est approuvé, créez la facture,', 'عند الموافقة على عرض السعر، أنشئ الفاتورة،'],
  ['reserve the stock, and notify finance.', 'réservez le stock et informez la finance.', 'واحجز المخزون، وأبلغ قسم المالية.'],
  ['Automate', 'Automatiser', 'أتمتة'], ['Automated', 'Automatisé', 'تمت الأتمتة'], ['Connected Workflows', 'Flux de travail connectés', 'سير عمل مترابط'],
  ['Automate processes with', 'Automatisez vos processus avec', 'أتمت العمليات باستخدام'],
  ['Time saved', 'Temps gagné', 'الوقت الموفر'], ['128 Hrs', '128 h', '128 ساعة'], ['↑ 18% efficiency', '↑ 18 % d’efficacité', '↑ كفاءة 18%'],
  ['Action: Approve', 'Action : Approuver', 'الإجراء: موافقة'], ['Decision Confidence: 98%', 'Confiance décisionnelle : 98 %', 'الثقة في القرار: 98%'], ['Path Optimized: +14.2%', 'Parcours optimisé : +14,2 %', 'المسار محسّن: +14.2%'],
  ['Faster Decisions', 'Décisions plus rapides', 'قرارات أسرع'], ['Turn insights into action', 'Transformez les données en actions', 'حوّل الرؤى إلى إجراءات'], ['instantly.', 'instantanément.', 'فوراً.'],

  ['Ready for Morocco’s', 'Prêt pour la transition marocaine vers', 'جاهز لتحول المغرب نحو'], ['e-invoicing shift.', 'la facture électronique.', 'الفوترة الإلكترونية.'],
  ['Create structured invoices, keep the right records, and connect compliance to the rest of your operation.', 'Créez des factures structurées, conservez les bons justificatifs et reliez la conformité à vos opérations.', 'أنشئ فواتير مهيكلة، واحتفظ بالسجلات الصحيحة، واربط الامتثال ببقية عملياتك.'],
  ['Structured', 'Structuré', 'مهيكل'], ['Connected', 'Connecté', 'مترابط'], ['Adaptable', 'Évolutif', 'قابل للتكيف'],
  ['Interactive electronic invoice preview', 'Aperçu interactif de facture électronique', 'معاينة تفاعلية للفاتورة الإلكترونية'],
  ['Invoices', 'Factures', 'الفواتير'], ['Customers', 'Clients', 'العملاء'], ['Reports', 'Rapports', 'التقارير'], ['Settings', 'Paramètres', 'الإعدادات'],
  ['Invoice', 'Facture', 'فاتورة'], ['Bill to', 'Facturé à', 'فاتورة إلى'], ['Issue date', 'Date d’émission', 'تاريخ الإصدار'], ['Due date', 'Date d’échéance', 'تاريخ الاستحقاق'],
  ['Item', 'Article', 'الصنف'], ['Qty.', 'Qté', 'الكمية'], ['Unit price', 'Prix unitaire', 'سعر الوحدة'], ['Amount', 'Montant', 'المبلغ'],
  ['Office chair', 'Chaise de bureau', 'كرسي مكتب'], ['Work desk', 'Bureau de travail', 'مكتب عمل'], ['Filing cabinet', 'Armoire de classement', 'خزانة ملفات'],
  ['Subtotal', 'Sous-total', 'المجموع الفرعي'], ['VAT (20%)', 'TVA (20 %)', 'ضريبة القيمة المضافة (20%)'], ['Total (MAD)', 'Total (MAD)', 'الإجمالي (درهم)'],
  ['Structured for e-invoicing', 'Structurée pour la facture électronique', 'مهيكلة للفوترة الإلكترونية'], ['Status', 'Statut', 'الحالة'], ['Ready', 'Prête', 'جاهزة'], ['Sent', 'Envoyée', 'تم الإرسال'],
  ['Invoice sent and recorded.', 'Facture envoyée et enregistrée.', 'تم إرسال الفاتورة وتسجيلها.'],
  ["Prepared for Morocco’s electronic invoicing requirements.", 'Préparée pour les exigences marocaines de facturation électronique.', 'مهيأة لمتطلبات الفوترة الإلكترونية في المغرب.'],
  ['Format', 'Format', 'الصيغة'], ['Language', 'Langue', 'اللغة'], ['Currency', 'Devise', 'العملة'], ['Send invoice', 'Envoyer la facture', 'إرسال الفاتورة'], ['Invoice sent', 'Facture envoyée', 'تم إرسال الفاتورة'],

  ['Every part of your business,', 'Toutes les dimensions de votre entreprise,', 'كل جزء من أعمالك،'], ['moving in one flow.', 'avancent dans un même flux.', 'يتحرك في مسار واحد.'],
  ['Feeling ready?', 'Prêt à avancer ?', 'هل أنت مستعد؟'], ['Navigation', 'Navigation', 'التنقل'], ['How it works', 'Fonctionnement', 'كيف يعمل'], ['Features', 'Fonctionnalités', 'الميزات'], ['Product scope', 'Périmètre produit', 'نطاق المنتج'],
  ['Company', 'Entreprise', 'الشركة'], ['About HikariTech', 'À propos de HikariTech', 'حول HikariTech'], ['Contact', 'Contact', 'التواصل'], ['Terms and Conditions', 'Conditions générales', 'الشروط والأحكام'], ['Privacy Policy', 'Politique de confidentialité', 'سياسة الخصوصية'],
  ['All rights reserved.', 'Tous droits réservés.', 'جميع الحقوق محفوظة.'], ['Business moves fast.', 'L’entreprise avance vite.', 'الأعمال تتحرك بسرعة.'], ['Stay ahead with Agent 71.', 'Gardez une longueur d’avance avec Agent 71.', 'ابقَ في المقدمة مع Agent 71.'],
  ['Email address', 'Adresse e-mail', 'البريد الإلكتروني'], ['Enter email address', 'Saisissez votre adresse e-mail', 'أدخل بريدك الإلكتروني'], ['Subscribe', 'S’abonner', 'اشترك'], ['Subscribed', 'Inscrit', 'تم الاشتراك'],

  ['Your whole business.', 'Toute votre entreprise.', 'أعمالك بالكامل.'], ['One living system.', 'Un seul système vivant.', 'نظام واحد متكامل.'],
  ['Agent 71 connects the work your teams do with the records your business needs—without the spreadsheet handoffs or legacy ERP weight.', 'Agent 71 relie le travail de vos équipes aux données dont votre entreprise a besoin, sans transferts entre feuilles de calcul ni lourdeur des ERP traditionnels.', 'يربط Agent 71 عمل فرقك بالسجلات التي تحتاجها مؤسستك، من دون تبادل جداول البيانات أو عبء أنظمة ERP التقليدية.'],
  ['Explore the system', 'Explorer le système', 'استكشف النظام'], ['Connected Agent 71 workflows', 'Flux Agent 71 connectés', 'سير عمل Agent 71 المترابط'],
  ['Agent 71 workspace', 'Espace Agent 71', 'مساحة عمل Agent 71'], ['Connected by design', 'Connecté par conception', 'مترابط بطبيعته'], ['One source of truth', 'Une source unique de vérité', 'مصدر موحد للحقيقة'],
  ['Every action updates the next team.', 'Chaque action met à jour l’équipe suivante.', 'كل إجراء يحدّث الفريق التالي.'], ['Live', 'En direct', 'مباشر'],
  ['Sell', 'Vendre', 'بيع'], ['Quote', 'Devis', 'عرض سعر'], ['Collect', 'Encaisser', 'تحصيل'], ['Stock', 'Stock', 'مخزون'], ['Reserve', 'Réserver', 'حجز'], ['Move', 'Déplacer', 'نقل'], ['Reorder', 'Réapprovisionner', 'إعادة طلب'],
  ['Finance', 'Finance', 'المالية'], ['Post', 'Comptabiliser', 'ترحيل'], ['Reconcile', 'Rapprocher', 'مطابقة'], ['Report', 'Analyser', 'تقارير'],
  ['Records stay connected', 'Les données restent connectées', 'تبقى السجلات مترابطة'], ['Sales · Finance · Stock · People', 'Ventes · Finance · Stock · Équipes', 'المبيعات · المالية · المخزون · الأفراد'],
  ['Explore the system.', 'Explorez le système.', 'استكشف النظام.'], ['Five connected areas. One operational record.', 'Cinq domaines connectés. Un seul registre opérationnel.', 'خمسة مجالات مترابطة. سجل تشغيلي واحد.'],
  ['Choose an area to see how Agent 71 is being shaped around the way modern businesses sell, move, account, and grow.', 'Choisissez un domaine pour découvrir comment Agent 71 s’adapte à la façon dont les entreprises modernes vendent, opèrent, comptabilisent et se développent.', 'اختر مجالاً لترى كيف يتشكل Agent 71 حول طريقة بيع المؤسسات الحديثة وتشغيلها ومحاسبتها ونموها.'],
  ['Product areas', 'Domaines du produit', 'مجالات المنتج'], ['Representative product direction', 'Orientation produit indicative', 'توجه تمثيلي للمنتج'], ['Availability and timing will be announced as Agent 71 develops.', 'La disponibilité et le calendrier seront annoncés au fil du développement d’Agent 71.', 'سيتم الإعلان عن التوفر والمواعيد مع تطور Agent 71.'],
  ['Sell & serve', 'Vendre & servir', 'البيع وخدمة العملاء'], ['From first conversation to money in the bank.', 'Du premier échange jusqu’à l’encaissement.', 'من أول محادثة حتى وصول المال إلى البنك.'],
  ['Keep the customer, quote, order, invoice, payment, and follow-up in one continuous record.', 'Gardez le client, le devis, la commande, la facture, le paiement et le suivi dans un dossier continu.', 'احتفظ بالعميل وعرض السعر والطلب والفاتورة والدفع والمتابعة في سجل واحد متصل.'],
  ['Sales & invoicing', 'Ventes & facturation', 'المبيعات والفوترة'], ['Quotes', 'Devis', 'عروض الأسعار'], ['Credit notes', 'Avoirs', 'إشعارات دائنة'], ['Recurring billing', 'Facturation récurrente', 'فوترة متكررة'], ['Payments', 'Paiements', 'المدفوعات'], ['Customer statements', 'Relevés clients', 'كشوف العملاء'],
  ['CRM & customers', 'CRM & clients', 'إدارة العملاء'], ['Leads', 'Prospects', 'العملاء المحتملون'], ['Pipeline', 'Pipeline', 'مسار المبيعات'], ['Follow-ups', 'Relances', 'المتابعات'], ['Contracts', 'Contrats', 'العقود'], ['Loyalty', 'Fidélité', 'الولاء'], ['Customer portal', 'Portail client', 'بوابة العميل'],
  ['Point of sale & commerce', 'Point de vente & commerce', 'نقطة البيع والتجارة'], ['Cloud POS', 'POS cloud', 'نقطة بيع سحابية'], ['Offline sales', 'Ventes hors ligne', 'مبيعات دون اتصال'], ['Returns', 'Retours', 'المرتجعات'], ['Multi-store pricing', 'Tarification multi-magasins', 'تسعير متعدد المتاجر'], ['Online payments', 'Paiements en ligne', 'مدفوعات إلكترونية'],
  ['Control finance', 'Piloter la finance', 'التحكم المالي'], ['A financial record built as the business moves.', 'Une comptabilité qui se construit au rythme de l’activité.', 'سجل مالي يُبنى مع حركة الأعمال.'],
  ['Operational activity becomes structured accounting, so finance can close faster and explain every number.', 'L’activité opérationnelle devient une comptabilité structurée pour clôturer plus vite et expliquer chaque chiffre.', 'يتحول النشاط التشغيلي إلى محاسبة منظمة، لتغلق المالية أسرع وتفسر كل رقم.'],
  ['Accounting & finance', 'Comptabilité & finance', 'المحاسبة والمالية'], ['Chart of accounts', 'Plan comptable', 'دليل الحسابات'], ['Journals', 'Journaux', 'اليوميات'], ['Cost centers', 'Centres de coûts', 'مراكز التكلفة'], ['Assets', 'Immobilisations', 'الأصول'], ['Bank accounts', 'Comptes bancaires', 'الحسابات البنكية'], ['Tax reports', 'Rapports fiscaux', 'التقارير الضريبية'],
  ['Reporting & intelligence', 'Reporting & pilotage', 'التقارير وذكاء الأعمال'], ['Live dashboards', 'Tableaux de bord en direct', 'لوحات تحكم مباشرة'], ['Financial statements', 'États financiers', 'القوائم المالية'], ['Sales analysis', 'Analyse des ventes', 'تحليل المبيعات'], ['Audit trails', 'Pistes d’audit', 'مسارات التدقيق'], ['Custom exports', 'Exports personnalisés', 'تصدير مخصص'],
  ['Move goods', 'Gérer les flux', 'حركة البضائع'], ['Know what is available, committed, and coming next.', 'Sachez ce qui est disponible, engagé et attendu.', 'اعرف ما هو متاح ومحجوز وما سيأتي لاحقاً.'],
  ['Connect purchasing, warehouses, planning, and production without losing the financial impact of each move.', 'Reliez achats, entrepôts, planification et production sans perdre l’impact financier de chaque mouvement.', 'اربط المشتريات والمستودعات والتخطيط والإنتاج مع الحفاظ على الأثر المالي لكل حركة.'],
  ['Inventory & purchasing', 'Stocks & achats', 'المخزون والمشتريات'], ['Products & barcodes', 'Produits & codes-barres', 'المنتجات والرموز الشريطية'], ['Warehouses', 'Entrepôts', 'المستودعات'], ['Transfers', 'Transferts', 'التحويلات'], ['Reorder rules', 'Règles de réapprovisionnement', 'قواعد إعادة الطلب'], ['Purchase orders', 'Bons de commande', 'طلبات الشراء'], ['Valuation', 'Valorisation', 'التقييم'],
  ['Manufacturing', 'Production', 'التصنيع'], ['Bills of materials', 'Nomenclatures', 'قوائم المواد'], ['Work centers', 'Postes de charge', 'مراكز العمل'], ['Material planning', 'Planification des matières', 'تخطيط المواد'], ['Quality', 'Qualité', 'الجودة'], ['Maintenance', 'Maintenance', 'الصيانة'], ['Production costing', 'Coûts de production', 'تكلفة الإنتاج'],
  ['Run the team', 'Piloter les équipes', 'إدارة الفريق'], ['Give work an owner, a deadline, and a cost.', 'Donnez à chaque tâche un responsable, une échéance et un coût.', 'امنح كل عمل مسؤولاً وموعداً وتكلفة.'],
  ['Bring people records and day-to-day delivery together, from attendance to projects and field operations.', 'Réunissez les dossiers collaborateurs et l’exécution quotidienne, de la présence aux projets et opérations terrain.', 'اجمع سجلات الأفراد والتنفيذ اليومي، من الحضور إلى المشاريع والعمليات الميدانية.'],
  ['People & payroll', 'RH & paie', 'الموارد البشرية والرواتب'], ['Employee records', 'Dossiers salariés', 'سجلات الموظفين'], ['Attendance', 'Présence', 'الحضور'], ['Leave', 'Congés', 'الإجازات'], ['Payroll', 'Paie', 'الرواتب'], ['Requests', 'Demandes', 'الطلبات'],
  ['Operations & projects', 'Opérations & projets', 'العمليات والمشاريع'], ['Projects', 'Projets', 'المشاريع'], ['Tasks', 'Tâches', 'المهام'], ['Work orders', 'Ordres de travail', 'أوامر العمل'], ['Time tracking', 'Suivi du temps', 'تتبع الوقت'], ['Bookings', 'Réservations', 'الحجوزات'], ['Profitability', 'Rentabilité', 'الربحية'],
  ['Connect it all', 'Tout connecter', 'اربط كل شيء'], ['One platform that can grow without starting over.', 'Une plateforme qui grandit sans tout recommencer.', 'منصة تنمو من دون البدء من جديد.'],
  ['A modular foundation for companies, branches, languages, permissions, automations, and external systems.', 'Une base modulaire pour sociétés, filiales, langues, droits, automatisations et systèmes externes.', 'أساس معياري للشركات والفروع واللغات والصلاحيات والأتمتة والأنظمة الخارجية.'],
  ['Platform & integrations', 'Plateforme & intégrations', 'المنصة والتكاملات'], ['Role-based access', 'Accès par rôle', 'صلاحيات حسب الدور'], ['Multi-company', 'Multi-sociétés', 'شركات متعددة'], ['Arabic, French & English', 'Arabe, français & anglais', 'العربية والفرنسية والإنجليزية'], ['APIs', 'API', 'واجهات API'], ['Mobile access', 'Accès mobile', 'وصول عبر الهاتف'], ['Automations', 'Automatisations', 'الأتمتة'],
  ['Morocco-ready foundation', 'Socle adapté au Maroc', 'أساس جاهز للمغرب'], ['MAD transactions', 'Transactions en MAD', 'معاملات بالدرهم'], ['VAT handling', 'Gestion de la TVA', 'معالجة الضريبة'], ['Local identifiers', 'Identifiants locaux', 'المعرّفات المحلية'], ['Traceable journals', 'Journaux traçables', 'يوميات قابلة للتتبع'], ['E-invoicing adaptability', 'Adaptabilité à la facture électronique', 'التكيف مع الفوترة الإلكترونية'],
  ['Global ERP thinking.', 'Une vision ERP globale.', 'رؤية ERP عالمية.'], ['Built for Morocco.', 'Conçu pour le Maroc.', 'مصمم للمغرب.'],
  ['Agent 71 pairs broad operational capability with the localization Moroccan businesses actually need.', 'Agent 71 associe une large couverture opérationnelle à la localisation dont les entreprises marocaines ont réellement besoin.', 'يجمع Agent 71 بين قدرات تشغيلية واسعة والتوطين الذي تحتاجه المؤسسات المغربية فعلاً.'],
  ['Morocco e-invoicing', 'Facturation électronique au Maroc', 'الفوترة الإلكترونية في المغرب'], ['Structured invoice preparation, validation-ready records, and a workflow designed to adapt as the national framework is finalized.', 'Préparation structurée, dossiers prêts à valider et flux conçu pour évoluer avec le cadre national.', 'إعداد فواتير مهيكلة وسجلات جاهزة للتحقق وسير عمل يتكيف مع اكتمال الإطار الوطني.'],
  ['Moroccan finance', 'Finance marocaine', 'المالية المغربية'], ['MAD-first transactions, VAT handling, traceable journals, and documents suited to local business operations.', 'Transactions en MAD, gestion de TVA, journaux traçables et documents adaptés aux opérations locales.', 'معاملات بالدرهم ومعالجة الضريبة ويوميات قابلة للتتبع ووثائق ملائمة للأعمال المحلية.'],
  ['Built for every stage', 'Conçu pour chaque étape', 'مصمم لكل مرحلة'], ['Start with the modules you need, then add teams, branches, and deeper operational capabilities as the business grows.', 'Commencez avec les modules utiles, puis ajoutez équipes, filiales et capacités au rythme de votre croissance.', 'ابدأ بالوحدات التي تحتاجها، ثم أضف الفرق والفروع والقدرات مع نمو الأعمال.'],
  ['Agent 71 is in development.', 'Agent 71 est en cours de développement.', 'Agent 71 قيد التطوير.'], ['Tell us what your', 'Dites-nous ce dont votre', 'أخبرنا بما تحتاجه'], ['business needs.', 'entreprise a besoin.', 'أعمالك.'],

  ['Morocco is changing', 'Le Maroc transforme', 'المغرب يغيّر'], ['how invoices', 'la circulation des', 'طريقة انتقال'], ['move.', 'factures.', 'الفواتير.'],
  ["Agent 71 is being designed to keep invoice data clean, connected, and ready to adapt as Morocco’s electronic-invoicing framework becomes operational.", 'Agent 71 est conçu pour garder les données de facturation propres, connectées et prêtes à évoluer avec la mise en œuvre du cadre marocain.', 'يُصمم Agent 71 للحفاظ على بيانات الفواتير نظيفة ومترابطة وجاهزة للتكيف مع دخول إطار الفوترة الإلكترونية المغربي حيز التنفيذ.'],
  ['Prepare your business', 'Préparer votre entreprise', 'جهّز أعمالك'], ['Understand the framework', 'Comprendre le cadre', 'افهم الإطار'],
  ['Updated 1 September 2026 · General information, not tax or legal advice.', 'Mis à jour le 1er septembre 2026 · Informations générales, sans valeur de conseil fiscal ou juridique.', 'آخر تحديث 1 سبتمبر 2026 · معلومات عامة وليست استشارة ضريبية أو قانونية.'],
  ['Illustrative future-ready invoicing workflow', 'Flux illustratif de facturation prêt pour l’avenir', 'سير عمل توضيحي جاهز للفوترة المستقبلية'], ['Agent 71 invoice flow', 'Flux de facturation Agent 71', 'مسار فواتير Agent 71'], ['Designed to adapt', 'Conçu pour évoluer', 'مصمم للتكيف'],
  ['Business record', 'Donnée métier', 'سجل الأعمال'], ['Validation layer', 'Couche de validation', 'طبقة التحقق'], ['Required channel', 'Canal requis', 'القناة المطلوبة'], ['Complete identifiers', 'Identifiants complets', 'معرّفات مكتملة'], ['Traceable status', 'Statut traçable', 'حالة قابلة للتتبع'], ['Adaptable mapping', 'Mapping adaptable', 'ربط قابل للتكيف'],
  ['Illustrative product direction. Final regulatory integration will follow the specifications applicable at launch.', 'Orientation produit illustrative. L’intégration réglementaire finale suivra les spécifications applicables au lancement.', 'توجه توضيحي للمنتج. سيتبع التكامل التنظيمي النهائي المواصفات المعمول بها عند الإطلاق.'],
  ['More than a PDF.', 'Bien plus qu’un PDF.', 'أكثر من ملف PDF.'], ['The practical shift is from a document people read to data that systems can also process, verify, and track.', 'Le changement consiste à passer d’un document lu par des personnes à des données que les systèmes peuvent traiter, vérifier et suivre.', 'التحول العملي هو الانتقال من وثيقة يقرأها الناس إلى بيانات تستطيع الأنظمة معالجتها والتحقق منها وتتبعها.'],
  ['Structured at the source', 'Structurée dès la source', 'مهيكلة من المصدر'], ['Invoice data needs to be consistent and machine-readable, not trapped inside manually prepared documents.', 'Les données doivent être cohérentes et lisibles par machine, pas enfermées dans des documents préparés manuellement.', 'يجب أن تكون بيانات الفاتورة متسقة وقابلة للقراءة آلياً، لا محصورة في وثائق معدة يدوياً.'],
  ['Connected to the process', 'Connectée au processus', 'مرتبطة بالعملية'], ['Issuing, receiving, correcting, and tracking invoices should become a controlled workflow instead of an email trail.', 'Émission, réception, correction et suivi doivent former un flux maîtrisé, plutôt qu’une suite d’e-mails.', 'ينبغي أن يصبح إصدار الفواتير واستلامها وتصحيحها وتتبعها سير عمل مضبوطاً بدلاً من سلسلة رسائل.'],
  ['Traceable by design', 'Traçable par conception', 'قابلة للتتبع بطبيعتها'], ['Identity, integrity, timestamps, statuses, and changes need a reliable history that finance teams can explain.', 'Identité, intégrité, horodatage, statuts et changements nécessitent un historique fiable que la finance peut expliquer.', 'تحتاج الهوية والسلامة والطوابع الزمنية والحالات والتغييرات إلى سجل موثوق يمكن للمالية تفسيره.'],
  ['What is clear.', 'Ce qui est clair.', 'ما هو واضح.'], ['What is still moving.', 'Ce qui évolue encore.', 'وما يزال قيد التطور.'], ['We separate published legal foundations from implementation details that businesses should continue to verify.', 'Nous distinguons les bases juridiques publiées des modalités d’application que les entreprises doivent continuer à vérifier.', 'نفصل بين الأسس القانونية المنشورة وتفاصيل التنفيذ التي ينبغي للمؤسسات مواصلة التحقق منها.'],
  ['Established foundation', 'Fondements établis', 'أساس قانوني قائم'], ['Confirm before acting', 'À confirmer avant d’agir', 'تحقق قبل التنفيذ'],
  ['The 2026 General Tax Code is the current consolidated tax reference.', 'Le Code général des impôts 2026 est la référence fiscale consolidée actuelle.', 'المدونة العامة للضرائب لسنة 2026 هي المرجع الضريبي الموحّد الحالي.'],
  ['Article 145 includes the legal basis for invoicing systems that meet technical criteria set by the administration.', 'L’article 145 prévoit la base juridique des systèmes de facturation répondant aux critères techniques de l’administration.', 'يتضمن الفصل 145 الأساس القانوني لأنظمة الفوترة المستوفية للمعايير التقنية التي تحددها الإدارة.'],
  ['Existing invoice content and record-keeping duties continue to matter.', 'Les obligations actuelles de contenu et de conservation restent applicables.', 'تظل متطلبات محتوى الفاتورة وحفظ السجلات الحالية مهمة.'],
  ['Law 43-20 provides the legal framework for electronic signatures, seals, timestamps, and trust services.', 'La loi 43-20 encadre signatures, cachets, horodatages électroniques et services de confiance.', 'يوفر القانون 43-20 الإطار القانوني للتوقيعات والأختام والطوابع الزمنية الإلكترونية وخدمات الثقة.'],
  ['The precise date your business becomes subject to the operational regime.', 'La date précise d’assujettissement de votre entreprise au régime opérationnel.', 'التاريخ الدقيق لخضوع مؤسستك للنظام التشغيلي.'],
  ['The final technical schema, transmission, validation, and acknowledgement rules.', 'Le schéma technique final et les règles de transmission, validation et accusé de réception.', 'المخطط التقني النهائي وقواعد الإرسال والتحقق والإقرار بالاستلام.'],
  ['Registration, provider, certificate, testing, and onboarding procedures.', 'Les procédures d’inscription, prestataire, certificat, test et intégration.', 'إجراءات التسجيل والمزوّد والشهادة والاختبار والانضمام.'],
  ['Any rollout-specific sanctions, exceptions, or transition arrangements.', 'Les sanctions, exceptions ou dispositions transitoires propres au déploiement.', 'أي عقوبات أو استثناءات أو ترتيبات انتقالية خاصة بالتطبيق.'],
  ['Prepare the parts', 'Préparez dès maintenant', 'جهّز ما يمكنك'], ['you control today.', 'ce que vous maîtrisez.', 'التحكم فيه اليوم.'], ['You do not need to guess the final specification to improve the quality of your data and process.', 'Vous n’avez pas besoin de deviner la spécification finale pour améliorer vos données et processus.', 'لا تحتاج إلى تخمين المواصفات النهائية لتحسين جودة بياناتك وعملياتك.'],
  ['Clean your identifiers', 'Nettoyez vos identifiants', 'نظّف معرّفاتك'], ['Review ICE, IF, RC, legal names, addresses, and customer master data.', 'Vérifiez ICE, IF, RC, raisons sociales, adresses et référentiel clients.', 'راجع ICE وIF وRC والأسماء القانونية والعناوين والبيانات الأساسية للعملاء.'],
  ['Standardize invoice data', 'Standardisez les données', 'وحّد بيانات الفواتير'], ['Use continuous numbering, clear product and service descriptions, tax rates, dates, and payment terms.', 'Utilisez une numérotation continue, des libellés clairs, les taux, dates et conditions de paiement.', 'استخدم ترقيمًا متسلسلاً وأوصافاً واضحة ومعدلات الضرائب والتواريخ وشروط الدفع.'],
  ['Map the real workflow', 'Cartographiez le flux réel', 'ارسم سير العمل الفعلي'], ['Document who creates, checks, approves, corrects, sends, receives, and reconciles each invoice.', 'Documentez qui crée, contrôle, approuve, corrige, envoie, reçoit et rapproche chaque facture.', 'وثّق من ينشئ ويراجع ويوافق ويصحح ويرسل ويستلم ويطابق كل فاتورة.'],
  ['Protect the audit trail', 'Protégez la piste d’audit', 'احمِ مسار التدقيق'], ['Avoid deleting issued documents. Use traceable corrections, credit notes, permissions, and event history.', 'Évitez de supprimer les pièces émises. Utilisez corrections traçables, avoirs, droits et historique.', 'تجنب حذف الوثائق الصادرة. استخدم تصحيحات قابلة للتتبع وإشعارات دائنة وصلاحيات وسجل أحداث.'],
  ['Keep your system adaptable', 'Gardez un système adaptable', 'حافظ على مرونة نظامك'], ['Choose tools that can support structured exports and future integration once final specifications apply to you.', 'Choisissez des outils compatibles avec les exports structurés et l’intégration future lorsque les règles finales s’appliqueront.', 'اختر أدوات تدعم التصدير المهيكل والتكامل المستقبلي عند تطبيق المواصفات النهائية عليك.'],
  ['How Agent 71 is being built for the shift.', 'Comment Agent 71 se prépare à la transition.', 'كيف يُبنى Agent 71 لهذا التحول.'], ['Structured source records, configurable invoice fields, controlled corrections, status history, role-based approvals, and an integration layer that can evolve when the final rules are published.', 'Données sources structurées, champs configurables, corrections contrôlées, historique des statuts, validations par rôle et couche d’intégration évolutive.', 'سجلات مصدر مهيكلة وحقول فواتير قابلة للتهيئة وتصحيحات مضبوطة وسجل حالات وموافقات حسب الدور وطبقة تكامل قابلة للتطور.'],
  ['Discuss your invoicing workflow', 'Parler de votre flux de facturation', 'ناقش سير عمل الفوترة لديك'], ['Official references.', 'Références officielles.', 'مراجع رسمية.'], ['Regulatory guidance changes. Verify your situation with the DGI and a qualified adviser.', 'Les orientations évoluent. Vérifiez votre situation auprès de la DGI et d’un conseiller qualifié.', 'تتغير التوجيهات التنظيمية. تحقق من وضعك لدى المديرية العامة للضرائب ومستشار مؤهل.'],
  ['General Tax Code 2026', 'Code général des impôts 2026', 'المدونة العامة للضرائب 2026'], ['Official DGI document referenced by the 2026 CGI publication.', 'Document officiel de la DGI cité dans la publication du CGI 2026.', 'وثيقة رسمية للمديرية العامة للضرائب مشار إليها في إصدار 2026.'], ['2026 CGI publication notice', 'Avis de publication du CGI 2026', 'إعلان نشر المدونة العامة للضرائب 2026'], ['Official Moroccan public-service announcement dated 31 December 2025.', 'Annonce officielle marocaine du 31 décembre 2025.', 'إعلان رسمي للمرفق العام المغربي بتاريخ 31 ديسمبر 2025.'], ['Law 43-20', 'Loi 43-20', 'القانون 43-20'], ['Official DGSSI text governing trust services for electronic transactions.', 'Texte officiel de la DGSSI sur les services de confiance pour les transactions électroniques.', 'النص الرسمي للمديرية العامة لأمن نظم المعلومات المنظم لخدمات الثقة للمعاملات الإلكترونية.'], ['DGI portal', 'Portail DGI', 'بوابة المديرية العامة للضرائب'], ['The tax administration portal for official notices, guidance, and future updates.', 'Le portail de l’administration fiscale pour avis, orientations et mises à jour.', 'بوابة الإدارة الضريبية للإعلانات والتوجيهات والتحديثات الرسمية.'],

  ['Terms', 'Conditions', 'الشروط'], ['Privacy', 'Confidentialité', 'الخصوصية'], ['Terms and conditions.', 'Conditions générales.', 'الشروط والأحكام.'], ['Plain-language rules for using the Agent 71 website while the product is still in development.', 'Les règles d’utilisation du site Agent 71, en langage clair, pendant le développement du produit.', 'قواعد واضحة لاستخدام موقع Agent 71 أثناء استمرار تطوير المنتج.'], ['Privacy policy.', 'Politique de confidentialité.', 'سياسة الخصوصية.'], ['How HikariTech handles personal information connected with the public Agent 71 website.', 'Comment HikariTech traite les données personnelles liées au site public Agent 71.', 'كيفية تعامل HikariTech مع المعلومات الشخصية المرتبطة بموقع Agent 71 العام.'],
  ['Effective 1 September 2026', 'En vigueur le 1er septembre 2026', 'سارية من 1 سبتمبر 2026'], ['On this page', 'Sur cette page', 'في هذه الصفحة'], ['Still have a question?', 'Vous avez encore une question ?', 'هل لا يزال لديك سؤال؟'], ['Learn about your CNDP rights', 'Découvrir vos droits auprès de la CNDP', 'تعرّف على حقوقك لدى CNDP'],
  ['Using this website', 'Utilisation du site', 'استخدام هذا الموقع'], ['You may use this website to learn about Agent 71 and contact HikariTech. You must not misuse the website, attempt unauthorized access, interfere with its operation, introduce malicious code, or use its content unlawfully.', 'Vous pouvez utiliser ce site pour découvrir Agent 71 et contacter HikariTech. Il est interdit d’en faire un usage abusif, de tenter un accès non autorisé, de perturber son fonctionnement, d’introduire du code malveillant ou d’utiliser son contenu illégalement.', 'يمكنك استخدام هذا الموقع للتعرف على Agent 71 والتواصل مع HikariTech. يُحظر إساءة استخدامه أو محاولة الوصول غير المصرح به أو تعطيل تشغيله أو إدخال برمجيات ضارة أو استخدام محتواه بصورة غير قانونية.'],
  ['Product status', 'État du produit', 'حالة المنتج'], ['Agent 71 is in development. Descriptions, screens, modules, availability, timing, pricing, and integrations are illustrative product direction and may change. Nothing on this website guarantees that a feature will be released on a particular date or in a particular form.', 'Agent 71 est en développement. Descriptions, écrans, modules, disponibilité, calendrier, tarifs et intégrations sont indicatifs et peuvent évoluer. Ce site ne garantit aucune sortie à une date ou sous une forme précise.', 'Agent 71 قيد التطوير. الأوصاف والشاشات والوحدات والتوفر والمواعيد والأسعار والتكاملات توجهات توضيحية وقد تتغير. لا يضمن الموقع إطلاق ميزة في تاريخ أو شكل محدد.'],
  ['No professional advice', 'Absence de conseil professionnel', 'لا تُعد استشارة مهنية'], ['Website content is general information. It is not accounting, tax, legal, regulatory, or other professional advice. You should obtain advice appropriate to your business before relying on information about compliance, including electronic invoicing.', 'Le contenu est général et ne constitue pas un conseil comptable, fiscal, juridique, réglementaire ou professionnel. Consultez un spécialiste adapté à votre activité avant de vous appuyer sur les informations de conformité.', 'محتوى الموقع معلومات عامة وليس استشارة محاسبية أو ضريبية أو قانونية أو تنظيمية أو مهنية. احصل على استشارة مناسبة قبل الاعتماد على معلومات الامتثال، بما فيها الفوترة الإلكترونية.'],
  ['Intellectual property', 'Propriété intellectuelle', 'الملكية الفكرية'], ['The Agent 71 name, logo, interface, illustrations, copy, and other website materials belong to HikariTech or its licensors and are protected by applicable law. You may view them for ordinary business evaluation but may not reproduce or exploit them without permission.', 'Le nom, le logo, l’interface, les illustrations, les textes et les autres éléments du site appartiennent à HikariTech ou à ses concédants et sont protégés. Vous pouvez les consulter pour évaluer le produit, sans les reproduire ni les exploiter sans autorisation.', 'اسم Agent 71 وشعاره وواجهته ورسوماته ونصوصه ومواد الموقع الأخرى مملوكة لـ HikariTech أو مرخصيها ومحمية بالقانون. يمكنك الاطلاع عليها للتقييم التجاري المعتاد ولا يجوز نسخها أو استغلالها دون إذن.'],
  ['Third-party services and links', 'Services et liens tiers', 'خدمات وروابط الأطراف الثالثة'], ['Links to government portals, social platforms, and other websites are provided for convenience. HikariTech does not control those services and is not responsible for their content, availability, security, or privacy practices.', 'Les liens vers des portails publics, réseaux sociaux et autres sites sont fournis par commodité. HikariTech ne contrôle pas ces services et n’est pas responsable de leur contenu, disponibilité, sécurité ou confidentialité.', 'تُقدّم روابط البوابات الحكومية والمنصات الاجتماعية والمواقع الأخرى للتسهيل. لا تتحكم HikariTech في تلك الخدمات ولا تتحمل مسؤولية محتواها أو توفرها أو أمنها أو ممارسات الخصوصية فيها.'],
  ['Availability and liability', 'Disponibilité et responsabilité', 'التوفر والمسؤولية'], ['We aim to keep the website accurate and available, but it is provided on an “as available” basis. To the extent permitted by applicable law, HikariTech is not liable for indirect or consequential loss arising from use of, or reliance on, this website. Nothing here excludes liability that cannot lawfully be excluded.', 'Nous cherchons à maintenir un site exact et disponible, fourni toutefois « selon disponibilité ». Dans les limites légales, HikariTech n’est pas responsable des pertes indirectes résultant de son utilisation. Rien n’exclut une responsabilité qui ne peut légalement l’être.', 'نسعى لإبقاء الموقع دقيقاً ومتاحاً، لكنه مقدم على أساس «حسب التوفر». وبالقدر الذي يسمح به القانون، لا تتحمل HikariTech مسؤولية الخسائر غير المباشرة الناتجة عن استخدام الموقع أو الاعتماد عليه. ولا يستبعد ذلك أي مسؤولية لا يجوز قانوناً استبعادها.'],
  ['Changes and governing law', 'Modifications et droit applicable', 'التغييرات والقانون المطبق'], ['We may update these terms as the website and Agent 71 evolve. The version shown here applies from its effective date. These terms are governed by the laws of Morocco, subject to any mandatory rights that apply to you.', 'Nous pouvons modifier ces conditions avec l’évolution du site et d’Agent 71. La version affichée s’applique à sa date d’effet. Elles sont régies par le droit marocain, sous réserve de vos droits impératifs.', 'قد نحدّث هذه الشروط مع تطور الموقع وAgent 71. تسري النسخة المعروضة من تاريخ نفاذها، وتخضع لقوانين المغرب مع مراعاة الحقوق الإلزامية المطبقة عليك.'],
  ['Questions about these terms can be sent to contact@hikaritech.ma. Commercial terms for the Agent 71 service will be provided separately before a customer subscribes or enters into a service agreement.', 'Envoyez vos questions à contact@hikaritech.ma. Les conditions commerciales du service Agent 71 seront fournies séparément avant tout abonnement ou contrat.', 'يمكن إرسال أسئلتك إلى contact@hikaritech.ma. ستُقدّم الشروط التجارية لخدمة Agent 71 بشكل منفصل قبل اشتراك العميل أو إبرامه اتفاقية خدمة.'],
  ['Who is responsible', 'Responsable du traitement', 'الجهة المسؤولة'], ['HikariTech is responsible for personal data described in this website notice. You can contact us at contact@hikaritech.ma. This notice covers the public Agent 71 website; a separate service privacy notice or data-processing agreement may apply when the product becomes available.', 'HikariTech est responsable des données décrites ici. Contact : contact@hikaritech.ma. Cet avis couvre le site public Agent 71 ; un avis de service ou accord de traitement distinct pourra s’appliquer au lancement.', 'تتحمل HikariTech مسؤولية البيانات الشخصية الموضحة في هذا الإشعار. يمكنك التواصل عبر contact@hikaritech.ma. يغطي الإشعار موقع Agent 71 العام، وقد يطبق إشعار خدمة أو اتفاق معالجة منفصل عند توفر المنتج.'],
  ['Data we may receive', 'Données reçues', 'البيانات التي قد نتلقاها'], ['We may receive your name, work email, company, role, message, and any information you choose to provide when you contact us or register interest. Website infrastructure may also create technical records such as IP address, device, browser, requested pages, dates, and security events.', 'Nous pouvons recevoir votre nom, e-mail professionnel, société, fonction, message et les informations fournies lors d’un contact. L’infrastructure peut aussi générer des données techniques : IP, appareil, navigateur, pages, dates et événements de sécurité.', 'قد نتلقى اسمك وبريدك المهني وشركتك ودورك ورسالتك وأي معلومات تقدمها عند التواصل أو تسجيل الاهتمام. وقد تنشئ بنية الموقع سجلات تقنية مثل عنوان IP والجهاز والمتصفح والصفحات والتواريخ والأحداث الأمنية.'],
  ['Why we use it', 'Finalités', 'لماذا نستخدمها'], ['We use data to answer enquiries, understand product interest, improve the website and Agent 71, protect the website, maintain business records, and send updates where you have asked to receive them. We use only data that is relevant to these purposes.', 'Nous utilisons les données pour répondre, comprendre l’intérêt, améliorer et protéger le site et Agent 71, tenir nos dossiers et envoyer les actualités demandées. Seules les données pertinentes sont utilisées.', 'نستخدم البيانات للرد على الاستفسارات وفهم الاهتمام وتحسين الموقع وAgent 71 وحمايتهما وحفظ السجلات وإرسال التحديثات المطلوبة. لا نستخدم إلا البيانات ذات الصلة بهذه الأغراض.'],
  ['How data is shared', 'Partage des données', 'كيفية مشاركة البيانات'], ['Data may be handled by service providers that support hosting, communications, security, analytics, or business operations, under appropriate instructions and safeguards. We may also disclose information when required by law or necessary to protect rights, users, or systems. We do not sell personal data.', 'Des prestataires d’hébergement, communication, sécurité, analyse ou opérations peuvent traiter les données sous instructions et garanties appropriées. Nous pouvons aussi les divulguer si la loi l’exige ou pour protéger droits, utilisateurs ou systèmes. Nous ne vendons pas les données personnelles.', 'قد يعالج البيانات مزودو خدمات الاستضافة والاتصالات والأمن والتحليلات أو العمليات وفق تعليمات وضمانات مناسبة. وقد نفصح عنها إذا طلب القانون أو لحماية الحقوق أو المستخدمين أو الأنظمة. نحن لا نبيع البيانات الشخصية.'],
  ['International processing', 'Traitement international', 'المعالجة الدولية'], ['Some service providers may process data outside Morocco. Where this occurs, HikariTech will assess and use the safeguards and formalities required by applicable Moroccan data-protection law, including CNDP requirements where relevant.', 'Certains prestataires peuvent traiter les données hors du Maroc. HikariTech évaluera et appliquera les garanties et formalités prévues par le droit marocain, notamment les exigences de la CNDP le cas échéant.', 'قد يعالج بعض المزودين البيانات خارج المغرب. ستقيّم HikariTech وتطبق الضمانات والإجراءات المطلوبة بموجب قانون حماية البيانات المغربي، بما فيها متطلبات CNDP عند الاقتضاء.'],
  ['Retention and security', 'Conservation et sécurité', 'الاحتفاظ والأمن'], ['We keep personal data only for as long as needed for the purpose collected, legal obligations, dispute handling, or legitimate business records. We use reasonable organizational and technical measures to protect data, although no internet service can guarantee absolute security.', 'Nous conservons les données le temps nécessaire aux finalités, obligations légales, litiges ou archives légitimes. Nous appliquons des mesures raisonnables, sans qu’aucun service internet puisse garantir une sécurité absolue.', 'نحتفظ بالبيانات للمدة اللازمة للغرض أو الالتزامات القانونية أو النزاعات أو السجلات المشروعة. ونستخدم تدابير تنظيمية وتقنية معقولة، مع عدم قدرة أي خدمة إنترنت على ضمان أمن مطلق.'],
  ['Your rights', 'Vos droits', 'حقوقك'], ['Under Morocco’s Law 09-08, you may have rights to information, access, rectification, and opposition in the conditions provided by law. Send a request to contact@hikaritech.ma. You may also contact or submit a complaint to the CNDP.', 'En vertu de la loi marocaine 09-08, vous pouvez disposer de droits d’information, d’accès, de rectification et d’opposition dans les conditions légales. Écrivez à contact@hikaritech.ma ou contactez la CNDP.', 'بموجب القانون المغربي 09-08، قد تتمتع بحقوق الإعلام والولوج والتصحيح والاعتراض وفق الشروط القانونية. أرسل طلبك إلى contact@hikaritech.ma، ويمكنك أيضاً التواصل مع CNDP أو تقديم شكوى إليها.'],
  ['Cookies and updates', 'Cookies et mises à jour', 'ملفات الارتباط والتحديثات'], ['The website may use essential storage or similar technologies needed for operation and security. If non-essential analytics or marketing technologies are introduced, we will update the notice and provide choices where required. We may update this notice as the website, product, or legal requirements evolve.', 'Le site peut utiliser un stockage essentiel au fonctionnement et à la sécurité. Si des outils non essentiels sont ajoutés, nous mettrons l’avis à jour et proposerons les choix requis. Cet avis peut évoluer avec le site, le produit ou la loi.', 'قد يستخدم الموقع تخزيناً أساسياً أو تقنيات مماثلة للتشغيل والأمن. وإذا أضيفت تحليلات أو تقنيات تسويقية غير أساسية فسنحدّث الإشعار ونوفر الخيارات المطلوبة. وقد يتغير الإشعار مع تطور الموقع أو المنتج أو المتطلبات القانونية.'],
]

const catalogues = { en: {}, fr: {}, ar: {} }
const canonical = new Map()
for (const [en, fr, ar] of entries) {
  catalogues.en[en] = en
  catalogues.fr[en] = fr
  catalogues.ar[en] = ar
  canonical.set(en, en)
  canonical.set(fr, en)
  canonical.set(ar, en)
}

const I18nContext = createContext(null)

function preferredLanguage() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (supportedLanguages.includes(saved)) return saved
  } catch { /* Storage may be unavailable in privacy modes. */ }
  const browserLanguage = navigator.language?.slice(0, 2).toLowerCase()
  return supportedLanguages.includes(browserLanguage) ? browserLanguage : 'en'
}

function translateValue(value, language) {
  if (!value || language === 'en' && !canonical.has(value.trim())) return value
  const match = value.match(/^(\s*)([\s\S]*?)(\s*)$/)
  const source = match?.[2] ?? value
  const key = canonical.get(source)
  if (!key) return value
  return `${match?.[1] ?? ''}${catalogues[language][key] ?? key}${match?.[3] ?? ''}`
}

function localizeTree(root, language) {
  if (!root) return
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const textNodes = []
  while (walker.nextNode()) textNodes.push(walker.currentNode)
  textNodes.forEach((node) => {
    if (node.parentElement?.closest('[data-no-translate], script, style')) return
    const next = translateValue(node.nodeValue, language)
    if (next !== node.nodeValue) node.nodeValue = next
  })
  const elements = root.nodeType === Node.ELEMENT_NODE ? [root, ...root.querySelectorAll('*')] : [...root.querySelectorAll('*')]
  elements.forEach((element) => {
    if (element.closest?.('[data-no-translate]')) return
    for (const attribute of ['aria-label', 'placeholder', 'title']) {
      if (!element.hasAttribute?.(attribute)) continue
      const current = element.getAttribute(attribute)
      const next = translateValue(current, language)
      if (next !== current) element.setAttribute(attribute, next)
    }
  })
}

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(preferredLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    try { window.localStorage.setItem(STORAGE_KEY, language) } catch { /* Optional preference only. */ }

    const update = (root = document.body) => localizeTree(root, language)
    update()
    document.title = translateValue(document.title, language)
    const description = document.querySelector('meta[name="description"]')
    if (description) description.content = translateValue(description.content, language)

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData') update(mutation.target.parentElement)
        if (mutation.type === 'attributes') update(mutation.target)
        mutation.addedNodes.forEach((node) => update(node.nodeType === Node.TEXT_NODE ? node.parentElement : node))
      })
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['aria-label', 'placeholder', 'title'], childList: true, characterData: true, subtree: true })
    return () => observer.disconnect()
  }, [language])

  const value = useMemo(() => ({ language, setLanguage, isRtl: language === 'ar' }), [language])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside I18nProvider')
  return context
}

export function LanguageSwitcher({ className = '' }) {
  const { language, setLanguage } = useI18n()
  return <div className={`language-switcher ${className}`} role="group" aria-label="Language">
    <button type="button" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
    <button type="button" aria-pressed={language === 'fr'} onClick={() => setLanguage('fr')}>FR</button>
    <button type="button" aria-pressed={language === 'ar'} onClick={() => setLanguage('ar')}>ع</button>
  </div>
}
