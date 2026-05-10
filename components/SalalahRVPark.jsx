import { useState, useEffect } from "react";

const ADMIN_PASS = "Salalah2026";
const PRICE_PER_NIGHT = 10;

const SLIDES = [
  { bg: "linear-gradient(135deg,#061209 0%,#0b2416 100%)", icon: "🌿", label: "Khareef Season" },
  { bg: "linear-gradient(135deg,#060f12 0%,#0a2020 100%)", icon: "🌫", label: "Misty Mountains" },
  { bg: "linear-gradient(135deg,#080f06 0%,#122010 100%)", icon: "🌧", label: "Salalah Rain"   },
  { bg: "linear-gradient(135deg,#0f0c04 0%,#1f1608 100%)", icon: "🏕", label: "RV Camping"     },
];

const DEMO_BOOKINGS = [
  { id:1, spot:12,  name:"محمد الحارثي",    phone:"+968 9123 4567", email:"m@t.com", checkin:"2026-07-10", checkout:"2026-07-14", guests:4, vtype:"كارافان",  vlength:"7", notes:"",           pay:"deposit", status:"reserved" },
  { id:2, spot:45,  name:"Sarah Johnson",   phone:"+44 7700 9001",  email:"s@t.com", checkin:"2026-07-09", checkout:"2026-07-12", guests:2, vtype:"Motorhome", vlength:"9", notes:"Quiet spot", pay:"paid",    status:"reserved" },
  { id:3, spot:88,  name:"أحمد البلوشي",    phone:"+968 9987 6543", email:"a@t.com", checkin:"2026-07-15", checkout:"2026-07-18", guests:6, vtype:"مقطورة",   vlength:"6", notes:"",           pay:"pending", status:"reserved" },
  { id:4, spot:120, name:"Fatima Al-Rashdi",phone:"+968 9111 2233", email:"f@t.com", checkin:"2026-07-20", checkout:"2026-07-25", guests:3, vtype:"Caravan",   vlength:"8", notes:"",           pay:"paid",    status:"reserved" },
];

function getNights(a, b) {
  if (!a || !b) return 0;
  var d = (new Date(b) - new Date(a)) / 86400000;
  return d > 0 ? Math.floor(d) : 0;
}

function getSpot(bookings) {
  var taken = {};
  bookings.forEach(function(b) { taken[b.spot] = true; });
  for (var i = 1; i <= 300; i++) { if (!taken[i]) return i; }
  return null;
}

var PAY_COLOR    = { pending:"#f59e0b", paid:"#22c55e", deposit:"#3b82f6" };
var STATUS_COLOR = { available:"#22c55e", reserved:"#f59e0b", maintenance:"#3b82f6", closed:"#ef4444" };

var AR = {
  dir:"rtl",
  siteName:"Salalah RV Park",
  heroH1:"عيش تجربة التخييم الفاخرة",
  heroH2:"في موسم صلالة الخريفي",
  heroSub:"احجز موقفك الآن واستمتع بأجواء الخريف الساحرة في قلب صلالة",
  heroCta:"احجز الآن",
  heroSec:"تصفح المميزات",
  badge:"🏔 موسم الخريف 2026",
  stats:[["300","موقف مجهّز"],["10 ر.ع","الليلة الواحدة"],["24/7","دعم متواصل"],["4.9 ⭐","تقييم الضيوف"]],
  whyTitle:"لماذا Salalah RV Park؟",
  features:[
    { icon:"🌿", title:"طبيعة خريفية ساحرة",    desc:"محاط بالجبال الخضراء والضباب الرقيق في قلب موسم الخريف" },
    { icon:"⚡", title:"خدمات شاملة مدمجة",     desc:"كهرباء وماء وصرف صحي — لا رسوم خفية إطلاقاً" },
    { icon:"🔒", title:"أمان على مدار الساعة",  desc:"حراسة أمنية وكاميرات مراقبة متكاملة لراحتك التامة" },
    { icon:"📶", title:"واي فاي عالي السرعة",   desc:"اتصال إنترنت قوي في جميع أرجاء المنتجع" },
    { icon:"🚿", title:"مرافق صحية فاخرة",      desc:"دورات مياه ومغاسل نظيفة تُصان على مدار اليوم" },
    { icon:"🛎", title:"استقبال حار دائم",       desc:"فريق متخصص لمساعدتك من الوصول حتى المغادرة" },
  ],
  pricingTitle:"الأسعار",
  pricingNote:"شامل الكهرباء والماء والصرف الصحي — بدون أي رسوم إضافية",
  priceLabel:"السعر لكل ليلة",
  priceCurrency:"ر.ع",
  pricePerNight:"لكل ليلة",
  priceInc:["كهرباء","ماء","صرف صحي","أمان 24/7","واي فاي"],
  bookTitle:"احجز موقفك الآن",
  bookSub:"أكمل النموذج وسيتم تخصيص موقف متاح تلقائياً",
  backHome:"العودة للرئيسية",
  fName:"الاسم الكامل",
  fPhone:"رقم الهاتف / واتساب",
  fEmail:"البريد الإلكتروني",
  fCheckin:"تاريخ الوصول",
  fCheckout:"تاريخ المغادرة",
  fArrTime:"وقت الوصول المتوقع",
  fGuests:"عدد الأشخاص",
  fVtype:"نوع المركبة",
  fVlength:"طول المركبة (متر)",
  fNotes:"ملاحظات إضافية",
  fSelectV:"اختر نوع المركبة",
  vtypes:["كارافان","موتورهوم","مقطورة"],
  fSubmit:"إرسال طلب الحجز",
  fSubmitting:"جارٍ الإرسال...",
  summaryTitle:"ملخص الحجز",
  sNights:"عدد الليالي",
  sPrice:"سعر الليلة",
  sTotal:"الإجمالي",
  sDeposit:"العربون (50%)",
  sSelectDates:"اختر تواريخ الوصول والمغادرة",
  successTitle:"تم استلام طلبك بنجاح! 🎉",
  successMsg:"تم استلام طلب الحجز بنجاح وسيتم تأكيد الحجز بعد التحقق من الدفع.",
  successSpot:"الموقف المخصص:",
  successNights:"عدد الليالي:",
  successTotal:"الإجمالي:",
  payThawani:"ادفع الآن عبر Thawani",
  payApple:"ادفع بـ Apple Pay",
  newBooking:"حجز جديد",
  adminNav:"الإدارة",
  adminTitle:"لوحة الإدارة",
  adminHint:"متاح للإدارة المخوّلة فقط",
  adminPassLabel:"كلمة المرور",
  adminEnter:"دخول",
  adminWrong:"كلمة المرور غير صحيحة",
  adminLogout:"خروج",
  search:"بحث بالاسم أو الهاتف...",
  tSpot:"الموقف", tGuest:"العميل", tDates:"التواريخ", tNights:"ليالٍ", tPay:"الدفع", tStatus:"الحالة", tActions:"إجراءات",
  edit:"تعديل", save:"حفظ", cancel:"إلغاء", sendLink:"رابط الدفع",
  payLabels:{ pending:"قيد الانتظار", paid:"مدفوع", deposit:"عربون مدفوع" },
  statusLabels:{ available:"متاح", reserved:"محجوز", maintenance:"صيانة", closed:"مغلق" },
  statLabels:["إجمالي الحجوزات","مواقف متاحة","مواقف محجوزة","حجوزات اليوم"],
  spotLabels:["متاح","محجوز","صيانة","مغلق"],
  noResults:"لا توجد نتائج",
  footerRights:"جميع الحقوق محفوظة",
  footerAddr:"صلالة، محافظة ظفار، سلطنة عُمان",
  footerPhone:"+968 9999 0000",
  dark:"ليلي", light:"نهاري",
  atm:[
    { bg:"linear-gradient(135deg,#0a1f10,#112a18)", icon:"🌧", title:"أمطار صلالة الساحرة",    desc:"استمتع بهطول الأمطار ورائحة الأرض في موسم الخريف" },
    { bg:"linear-gradient(135deg,#0d1f1a,#0f2820)", icon:"🌫", title:"الضباب والجبال الخضراء", desc:"منظر خلاب لا مثيل له في الخليج العربي" },
    { bg:"linear-gradient(135deg,#1a1a0a,#252010)", icon:"🌙", title:"ليالٍ هادئة تحت النجوم", desc:"سماء صافية وهواء نقي وراحة تامة" },
  ],
};

var EN = {
  dir:"ltr",
  siteName:"Salalah RV Park",
  heroH1:"Experience Luxury RV Camping",
  heroH2:"in Salalah's Khareef Season",
  heroSub:"Book your spot and enjoy the magical mist and greenery of Salalah",
  heroCta:"Book Now",
  heroSec:"Explore Features",
  badge:"🏔 Khareef Season 2026",
  stats:[["300","Equipped Spots"],["10 OMR","Per Night"],["24/7","Support"],["4.9 ⭐","Guest Rating"]],
  whyTitle:"Why Salalah RV Park?",
  features:[
    { icon:"🌿", title:"Magical Khareef Nature",    desc:"Surrounded by misty green mountains in Salalah's legendary Khareef season" },
    { icon:"⚡", title:"All-Inclusive Hookups",     desc:"Electricity, water & sewer included — no hidden fees ever" },
    { icon:"🔒", title:"24/7 Security",             desc:"Full security team and cameras for complete peace of mind" },
    { icon:"📶", title:"High-Speed WiFi",           desc:"Strong internet connection throughout the resort" },
    { icon:"🚿", title:"Premium Facilities",        desc:"Clean, well-maintained bathrooms around the clock" },
    { icon:"🛎", title:"Warm Reception",            desc:"Dedicated team ready from your arrival to checkout" },
  ],
  pricingTitle:"Pricing",
  pricingNote:"Includes electricity, water & sewer — no extra charges",
  priceLabel:"Price per Night",
  priceCurrency:"OMR",
  pricePerNight:"per night",
  priceInc:["Electricity","Water","Sewer Connection","24/7 Security","WiFi"],
  bookTitle:"Book Your Spot Now",
  bookSub:"Complete the form and an available spot will be assigned automatically",
  backHome:"Back to Home",
  fName:"Full Name",
  fPhone:"Phone / WhatsApp",
  fEmail:"Email Address",
  fCheckin:"Check-in Date",
  fCheckout:"Check-out Date",
  fArrTime:"Expected Arrival Time",
  fGuests:"Number of Guests",
  fVtype:"Vehicle Type",
  fVlength:"Vehicle Length (meters)",
  fNotes:"Additional Notes",
  fSelectV:"Select vehicle type",
  vtypes:["Caravan","Motorhome","Trailer"],
  fSubmit:"Submit Booking Request",
  fSubmitting:"Submitting...",
  summaryTitle:"Booking Summary",
  sNights:"Nights",
  sPrice:"Price/Night",
  sTotal:"Total",
  sDeposit:"Deposit (50%)",
  sSelectDates:"Select check-in and check-out dates",
  successTitle:"Booking Request Received! 🎉",
  successMsg:"Your booking request has been received successfully and will be confirmed after payment verification.",
  successSpot:"Assigned Spot:",
  successNights:"Number of Nights:",
  successTotal:"Total:",
  payThawani:"Pay Now via Thawani",
  payApple:"Pay with Apple Pay",
  newBooking:"New Booking",
  adminNav:"Admin",
  adminTitle:"Admin Dashboard",
  adminHint:"Restricted to authorized staff only",
  adminPassLabel:"Password",
  adminEnter:"Enter",
  adminWrong:"Incorrect password",
  adminLogout:"Logout",
  search:"Search by name or phone...",
  tSpot:"Spot", tGuest:"Guest", tDates:"Dates", tNights:"Nights", tPay:"Payment", tStatus:"Status", tActions:"Actions",
  edit:"Edit", save:"Save", cancel:"Cancel", sendLink:"Payment Link",
  payLabels:{ pending:"Pending", paid:"Paid", deposit:"Deposit Paid" },
  statusLabels:{ available:"Available", reserved:"Reserved", maintenance:"Maintenance", closed:"Closed" },
  statLabels:["Total Bookings","Available Spots","Reserved Spots","Today's Bookings"],
  spotLabels:["Available","Reserved","Maintenance","Closed"],
  noResults:"No results found",
  footerRights:"All Rights Reserved",
  footerAddr:"Salalah, Dhofar Governorate, Sultanate of Oman",
  footerPhone:"+968 9999 0000",
  dark:"Dark", light:"Light",
  atm:[
    { bg:"linear-gradient(135deg,#0a1f10,#112a18)", icon:"🌧", title:"Salalah's Magical Rain",    desc:"Enjoy the rainfall and earth's fragrance during Khareef" },
    { bg:"linear-gradient(135deg,#0d1f1a,#0f2820)", icon:"🌫", title:"Misty Green Mountains",     desc:"A breathtaking view unlike anywhere in the Arabian Gulf" },
    { bg:"linear-gradient(135deg,#1a1a0a,#252010)", icon:"🌙", title:"Quiet Nights Under Stars",  desc:"Clear skies, fresh air, and complete relaxation" },
  ],
};

export default function SalalahRVPark() {
  var [lang, setLang]           = useState("ar");
  var [dark, setDark]           = useState(true);
  var [page, setPage]           = useState("home");
  var [slide, setSlide]         = useState(0);
  var [bookings, setBookings]   = useState(DEMO_BOOKINGS);
  var [submitted, setSubmitted] = useState(null);
  var [busy, setBusy]           = useState(false);
  var [search, setSearch]       = useState("");
  var [editId, setEditId]       = useState(null);
  var [editRow, setEditRow]     = useState({});
  var [authed, setAuthed]       = useState(false);
  var [passVal, setPassVal]     = useState("");
  var [passErr, setPassErr]     = useState(false);
  var [form, setForm]           = useState({ name:"", phone:"", email:"", checkin:"", checkout:"", arrTime:"14:00", guests:"2", vtype:"", vlength:"", notes:"" });
  var [errs, setErrs]           = useState({});

  var T    = lang === "ar" ? AR : EN;
  var isAR = lang === "ar";

  useEffect(function() {
    var id = setInterval(function() {
      setSlide(function(s) { return (s + 1) % SLIDES.length; });
    }, 4000);
    return function() { clearInterval(id); };
  }, []);

  /* ── theme ── */
  var bg     = dark ? "#07100a" : "#f3f8f1";
  var card   = dark ? "#0d1a10" : "#ffffff";
  var cardB  = dark ? "#111d14" : "#eef6ea";
  var border = dark ? "#1a2e1e" : "#c8e6c0";
  var text   = dark ? "#dcefd4" : "#18281a";
  var muted  = dark ? "#5e8a65" : "#4a7050";
  var accent = "#2a9648";
  var accentD= dark ? "#163824" : "#d0eed8";
  var gold   = "#c4943a";
  var goldD  = dark ? "#3a2808" : "#fdf3df";
  var inputBg= dark ? "#09120b" : "#ffffff";
  var inputBr= dark ? "#1e3824" : "#aed8a8";
  var navBg  = dark ? "rgba(7,16,10,0.96)" : "rgba(243,248,241,0.96)";
  var shadow = dark ? "0 6px 28px rgba(0,0,0,0.55)" : "0 6px 28px rgba(0,60,0,0.08)";

  var INP = { width:"100%", padding:"11px 14px", borderRadius:10, border:"1.5px solid "+inputBr, background:inputBg, color:text, fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit", transition:"border .2s" };
  var LBL = { fontSize:12, fontWeight:700, color:muted, marginBottom:5, display:"block", letterSpacing:.4 };
  var BTN = { background:"linear-gradient(135deg,#2a9648,#1b6e32)", color:"#fff", border:"none", borderRadius:12, padding:"13px 30px", fontSize:15, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 18px rgba(42,150,72,0.38)", transition:"opacity .2s" };
  var BTNOUT = { background:"transparent", color:text, border:"1.5px solid "+border, borderRadius:12, padding:"12px 22px", fontSize:14, cursor:"pointer" };
  var CARD = { background:card, border:"1px solid "+border, borderRadius:16, padding:"26px", boxShadow:shadow };

  function setF(key, val) { setForm(function(p) { var o = Object.assign({}, p); o[key] = val; return o; }); }

  function validate() {
    var e = {};
    if (!form.name.trim())   e.name    = 1;
    if (!form.phone.trim())  e.phone   = 1;
    if (!form.email.includes("@")) e.email = 1;
    if (!form.checkin)       e.checkin = 1;
    if (!form.checkout || getNights(form.checkin, form.checkout) < 1) e.checkout = 1;
    if (!form.vtype)         e.vtype   = 1;
    if (!form.vlength)       e.vlength = 1;
    setErrs(e);
    return Object.keys(e).length === 0;
  }

  function submitForm() {
    if (!validate()) return;
    setBusy(true);
    setTimeout(function() {
      var spot = getSpot(bookings);
      var n    = getNights(form.checkin, form.checkout);
      var nb   = { id:Date.now(), spot:spot, name:form.name, phone:form.phone, email:form.email, checkin:form.checkin, checkout:form.checkout, guests:Number(form.guests), vtype:form.vtype, vlength:form.vlength, notes:form.notes, pay:"pending", status:"reserved", arrTime:form.arrTime };
      setBookings(function(prev) { return prev.concat([nb]); });
      setSubmitted({ spot:spot, n:n, total:n * PRICE_PER_NIGHT });
      setBusy(false);
    }, 1600);
  }

  function tryLogin() {
    if (passVal === ADMIN_PASS) { setAuthed(true); setPassErr(false); }
    else { setPassErr(true); }
  }

  function logout() { setAuthed(false); setPassVal(""); setPassErr(false); setPage("home"); }

  var nights      = getNights(form.checkin, form.checkout);
  var total       = nights * PRICE_PER_NIGHT;
  var reservedCnt = bookings.filter(function(b) { return b.status === "reserved"; }).length;
  var availCnt    = 300 - reservedCnt - 2;
  var todayCnt    = bookings.filter(function(b) { return b.checkin === new Date().toISOString().slice(0,10); }).length;
  var filtered    = bookings.filter(function(b) { return b.name.toLowerCase().includes(search.toLowerCase()) || b.phone.includes(search); });

  /* ════════════════════════════════════════════
     NAV
  ════════════════════════════════════════════ */
  var Nav = (
    <nav style={{ position:"sticky", top:0, zIndex:200, background:navBg, backdropFilter:"blur(18px)", borderBottom:"1px solid "+border, height:62, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", gap:10 }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={function() { setPage("home"); setSubmitted(null); }}>
        <div style={{ width:34, height:34, borderRadius:"50%", background:"linear-gradient(135deg,"+accent+","+gold+")", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🌿</div>
        <span style={{ fontWeight:800, fontSize:16, color:text, whiteSpace:"nowrap" }}>{T.siteName}</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
        {page === "home" && <a href="#features" style={{ color:muted, textDecoration:"none", fontSize:13, fontWeight:600, padding:"4px 8px" }}>{T.T !== undefined ? "" : (isAR ? "المميزات" : "Features")}</a>}
        {page === "home" && <a href="#pricing"  style={{ color:muted, textDecoration:"none", fontSize:13, fontWeight:600, padding:"4px 8px" }}>{isAR ? "الأسعار" : "Pricing"}</a>}
        <button onClick={function() { setPage(page === "admin" ? "home" : "admin"); }} style={{ background:cardB, color:muted, border:"1px solid "+border, borderRadius:8, padding:"5px 12px", fontSize:12, cursor:"pointer", fontWeight:600 }}>{T.adminNav}</button>
        <button onClick={function() { setDark(!dark); }} style={{ background:cardB, border:"1px solid "+border, borderRadius:8, padding:"5px 10px", cursor:"pointer", fontSize:14 }}>{dark ? "☀️" : "🌙"}</button>
        <button onClick={function() { setLang(lang === "ar" ? "en" : "ar"); }} style={Object.assign({}, BTN, { padding:"6px 14px", fontSize:13, borderRadius:8 })}>{lang === "ar" ? "EN" : "عربي"}</button>
      </div>
    </nav>
  );

  /* ════════════════════════════════════════════
     HOME
  ════════════════════════════════════════════ */
  if (page === "home") return (
    <div dir={T.dir} style={{ fontFamily: isAR ? "'Tajawal',sans-serif" : "Georgia,serif", background:bg, color:text, minHeight:"100vh" }}>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:#2a9648;border-radius:3px;}.hov:hover{transform:translateY(-3px);transition:transform .2s;}a{text-decoration:none;}"}</style>
      {Nav}

      {/* HERO */}
      <section style={{ minHeight:"91vh", background:SLIDES[slide].bg, display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"60px 20px", position:"relative", overflow:"hidden", transition:"background 1.2s" }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 45% 55%,rgba(42,150,72,0.08),transparent 65%)" }}/>
        <div style={{ position:"absolute", width:560, height:560, borderRadius:"50%", border:"1px solid rgba(42,150,72,0.09)", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}/>
        <div style={{ position:"absolute", width:360, height:360, borderRadius:"50%", border:"1px solid rgba(42,150,72,0.13)", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }}/>

        {/* dots */}
        <div style={{ position:"absolute", bottom:26, left:"50%", transform:"translateX(-50%)", display:"flex", gap:7 }}>
          {SLIDES.map(function(_, i) {
            return <div key={i} onClick={function() { setSlide(i); }} style={{ width:i===slide?22:7, height:7, borderRadius:99, background:i===slide?accent:"rgba(255,255,255,0.22)", cursor:"pointer", transition:"all .35s" }}/>;
          })}
        </div>

        {/* badge */}
        <div style={{ position:"absolute", top:22, [isAR?"left":"right"]:22, background:"linear-gradient(135deg,"+gold+",#9a7020)", color:"#fff", borderRadius:99, padding:"5px 15px", fontSize:12, fontWeight:700 }}>{T.badge}</div>

        <div style={{ position:"relative", zIndex:1, maxWidth:720 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(42,150,72,0.13)", border:"1px solid rgba(42,150,72,0.28)", borderRadius:99, padding:"6px 18px", marginBottom:26, fontSize:14, color:accent, fontWeight:700 }}>
            <span style={{ fontSize:20 }}>{SLIDES[slide].icon}</span>
            صلالة، سلطنة عُمان &nbsp;|&nbsp; Salalah, Oman
          </div>
          <h1 style={{ fontSize:"clamp(2rem,5.5vw,4rem)", fontWeight:900, lineHeight:1.15, marginBottom:14, background:"linear-gradient(135deg,#d8eece,"+accent+")", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{T.heroH1}</h1>
          <h2 style={{ fontSize:"clamp(1.4rem,3.2vw,2.4rem)", fontWeight: isAR ? 700 : 600, color:gold, marginBottom:20, fontStyle: isAR ? "normal" : "italic" }}>{T.heroH2}</h2>
          <p style={{ fontSize:16, color:muted, marginBottom:42, lineHeight:1.8, maxWidth:500, margin:"0 auto 42px" }}>{T.heroSub}</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={function() { setPage("book"); }} style={Object.assign({}, BTN, { fontSize:17, padding:"15px 42px", borderRadius:14 })}>{T.heroCta} →</button>
            <button onClick={function() { var el=document.getElementById("features"); if(el) el.scrollIntoView({behavior:"smooth"}); }} style={Object.assign({}, BTNOUT, { fontSize:15, padding:"14px 26px", borderRadius:14 })}>{T.heroSec}</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background:card, borderBottom:"1px solid "+border, padding:"26px 20px" }}>
        <div style={{ maxWidth:860, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:18, textAlign:"center" }}>
          {T.stats.map(function(s, i) {
            return <div key={i}><div style={{ fontSize:27, fontWeight:900, color:accent }}>{s[0]}</div><div style={{ fontSize:13, color:muted, marginTop:4 }}>{s[1]}</div></div>;
          })}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding:"76px 20px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:2, color:accent, textTransform:"uppercase" }}>Salalah RV Park</span>
            <h2 style={{ fontSize:"clamp(1.7rem,3.8vw,2.7rem)", fontWeight:800, color:text, marginTop:10 }}>{T.whyTitle}</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:18 }}>
            {T.features.map(function(f, i) {
              return (
                <div key={i} className="hov" style={Object.assign({}, CARD, { display:"flex", gap:14, alignItems:"flex-start", cursor:"default" })}>
                  <div style={{ fontSize:28, width:50, height:50, background:accentD, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{f.icon}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:15, marginBottom:6, color:text }}>{f.title}</div>
                    <div style={{ fontSize:13, color:muted, lineHeight:1.65 }}>{f.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding:"70px 20px", background:cardB }}>
        <div style={{ maxWidth:560, margin:"0 auto", textAlign:"center" }}>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:2, color:gold, textTransform:"uppercase" }}>{T.pricingTitle}</span>
          <h2 style={{ fontSize:"clamp(1.7rem,3.8vw,2.5rem)", fontWeight:800, color:text, marginTop:10, marginBottom:14 }}>{T.pricingTitle}</h2>
          <p style={{ color:muted, marginBottom:38, fontSize:14 }}>{T.pricingNote}</p>
          <div style={{ background:card, border:"2px solid "+accent, borderRadius:22, padding:"44px 34px", boxShadow:"0 10px 44px rgba(42,150,72,0.18)", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:"linear-gradient(90deg,"+accent+","+gold+","+accent+")" }}/>
            <div style={{ fontSize:12, color:muted, fontWeight:600, marginBottom:10 }}>{T.priceLabel}</div>
            <div style={{ display:"flex", alignItems:"baseline", justifyContent:"center", gap:7, marginBottom:5 }}>
              <span style={{ fontSize:"clamp(3rem,8vw,4.8rem)", fontWeight:900, color:accent, lineHeight:1 }}>10</span>
              <span style={{ fontSize:20, color:gold, fontWeight:700 }}>{T.priceCurrency}</span>
            </div>
            <div style={{ fontSize:13, color:muted, marginBottom:32 }}>{T.pricePerNight}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9, marginBottom:36, textAlign: isAR ? "right" : "left" }}>
              {T.priceInc.map(function(x, i) {
                return <div key={i} style={{ display:"flex", alignItems:"center", gap:7, fontSize:13, color:text }}><span style={{ color:accent, fontWeight:800 }}>✓</span>{x}</div>;
              })}
            </div>
            <button onClick={function() { setPage("book"); }} style={Object.assign({}, BTN, { width:"100%", fontSize:16, padding:"14px" })}>{T.heroCta}</button>
          </div>
        </div>
      </section>

      {/* ATMOSPHERE */}
      <section style={{ padding:"70px 20px" }}>
        <div style={{ maxWidth:940, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))", gap:14 }}>
          {T.atm.map(function(a, i) {
            return (
              <div key={i} className="hov" style={{ background:a.bg, borderRadius:18, padding:"34px 26px", color:"#fff", border:"1px solid rgba(42,150,72,0.14)", cursor:"default" }}>
                <div style={{ fontSize:38, marginBottom:14 }}>{a.icon}</div>
                <div style={{ fontWeight:700, fontSize:16, marginBottom:9 }}>{a.title}</div>
                <div style={{ fontSize:13, opacity:.72, lineHeight:1.65 }}>{a.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:card, borderTop:"1px solid "+border, padding:"38px 20px", textAlign:"center" }}>
        <div style={{ fontSize:22, marginBottom:10 }}>🌿</div>
        <div style={{ fontWeight:800, fontSize:17, color:text, marginBottom:5 }}>{T.siteName}</div>
        <div style={{ fontSize:13, color:muted, marginBottom:3 }}>{T.footerAddr}</div>
        <div style={{ fontSize:13, color:muted, marginBottom:22 }}>{T.footerPhone}</div>
        <button onClick={function() { setPage("book"); }} style={Object.assign({}, BTN, { padding:"11px 34px" })}>{T.heroCta}</button>
        <div style={{ fontSize:11, color:muted, marginTop:26 }}>© 2026 {T.siteName} · {T.footerRights}</div>
      </footer>
    </div>
  );

  /* ════════════════════════════════════════════
     BOOKING
  ════════════════════════════════════════════ */
  if (page === "book") return (
    <div dir={T.dir} style={{ fontFamily: isAR ? "'Tajawal',sans-serif" : "Georgia,serif", background:bg, color:text, minHeight:"100vh" }}>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');*{box-sizing:border-box;margin:0;padding:0;}input:focus,select:focus,textarea:focus{border-color:#2a9648!important;box-shadow:0 0 0 3px rgba(42,150,72,0.15);}@keyframes spin{to{transform:rotate(360deg)}}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:#2a9648;border-radius:3px;}"}</style>
      {Nav}

      {submitted ? (
        <div style={{ minHeight:"88vh", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div style={Object.assign({}, CARD, { maxWidth:480, width:"100%", textAlign:"center" })}>
            <div style={{ width:68, height:68, background:"linear-gradient(135deg,"+accent+",#186e2a)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, margin:"0 auto 22px", boxShadow:"0 8px 22px rgba(42,150,72,0.38)" }}>✓</div>
            <h2 style={{ fontSize:21, fontWeight:800, color:text, marginBottom:10 }}>{T.successTitle}</h2>
            <p style={{ color:muted, marginBottom:28, lineHeight:1.7, fontSize:14 }}>{T.successMsg}</p>
            <div style={{ background:cardB, borderRadius:13, padding:"18px 22px", marginBottom:24, textAlign: isAR ? "right" : "left" }}>
              {[[T.successSpot, "#"+submitted.spot],[T.successNights, submitted.n+(isAR?" ليلة":" nights")],[T.successTotal, submitted.total+" OMR"]].map(function(r, i) {
                return (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom: i < 2 ? "1px solid "+border : "none" }}>
                    <span style={{ color:muted, fontSize:13 }}>{r[0]}</span>
                    <span style={{ fontWeight:700, color:accent, fontSize:14 }}>{r[1]}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:9, marginBottom:18 }}>
              <button style={Object.assign({}, BTN, { width:"100%", padding:"12px" })}>💳 {T.payThawani}</button>
              <button style={{ background:"#000", color:"#fff", border:"none", borderRadius:11, padding:"12px", fontSize:14, cursor:"pointer", fontWeight:700 }}>🍎 {T.payApple}</button>
            </div>
            <button onClick={function() { setSubmitted(null); setForm({ name:"", phone:"", email:"", checkin:"", checkout:"", arrTime:"14:00", guests:"2", vtype:"", vlength:"", notes:"" }); }} style={Object.assign({}, BTNOUT, { width:"100%", fontSize:13 })}>{T.newBooking}</button>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth:940, margin:"0 auto", padding:"32px 16px" }}>
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <button onClick={function() { setPage("home"); }} style={{ background:"none", border:"none", color:muted, cursor:"pointer", fontSize:13, marginBottom:14 }}>← {T.backHome}</button>
            <h1 style={{ fontSize:"clamp(1.5rem,4vw,2.2rem)", fontWeight:800, color:text }}>{T.bookTitle}</h1>
            <p style={{ color:muted, marginTop:7, fontSize:13 }}>{T.bookSub}</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr min(330px,100%)", gap:22, alignItems:"start" }}>
            {/* form */}
            <div style={CARD}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <div style={{ gridColumn:"1/-1" }}>
                  <label style={LBL}>{T.fName} *</label>
                  <input style={Object.assign({}, INP, { borderColor: errs.name ? gold : inputBr })} value={form.name} onChange={function(e){setF("name",e.target.value);}} placeholder={isAR?"محمد الحارثي":"John Smith"} />
                </div>
                <div>
                  <label style={LBL}>{T.fPhone} *</label>
                  <input style={Object.assign({}, INP, { borderColor: errs.phone ? gold : inputBr })} value={form.phone} onChange={function(e){setF("phone",e.target.value);}} placeholder="+968 9xxx xxxx" />
                </div>
                <div>
                  <label style={LBL}>{T.fEmail} *</label>
                  <input type="email" style={Object.assign({}, INP, { borderColor: errs.email ? gold : inputBr })} value={form.email} onChange={function(e){setF("email",e.target.value);}} placeholder="email@example.com" />
                </div>
                <div>
                  <label style={LBL}>{T.fCheckin} *</label>
                  <input type="date" style={Object.assign({}, INP, { borderColor: errs.checkin ? gold : inputBr })} value={form.checkin} onChange={function(e){setF("checkin",e.target.value);}} />
                </div>
                <div>
                  <label style={LBL}>{T.fCheckout} *</label>
                  <input type="date" style={Object.assign({}, INP, { borderColor: errs.checkout ? gold : inputBr })} value={form.checkout} onChange={function(e){setF("checkout",e.target.value);}} />
                </div>
                <div>
                  <label style={LBL}>{T.fArrTime}</label>
                  <input type="time" style={INP} value={form.arrTime} onChange={function(e){setF("arrTime",e.target.value);}} />
                </div>
                <div>
                  <label style={LBL}>{T.fGuests}</label>
                  <input type="number" min="1" max="20" style={INP} value={form.guests} onChange={function(e){setF("guests",e.target.value);}} />
                </div>
                <div>
                  <label style={LBL}>{T.fVtype} *</label>
                  <select style={Object.assign({}, INP, { borderColor: errs.vtype ? gold : inputBr })} value={form.vtype} onChange={function(e){setF("vtype",e.target.value);}}>
                    <option value="">{T.fSelectV}</option>
                    {T.vtypes.map(function(v){ return <option key={v} value={v}>{v}</option>; })}
                  </select>
                </div>
                <div>
                  <label style={LBL}>{T.fVlength} *</label>
                  <input type="number" min="3" max="25" style={Object.assign({}, INP, { borderColor: errs.vlength ? gold : inputBr })} value={form.vlength} onChange={function(e){setF("vlength",e.target.value);}} placeholder="7" />
                </div>
                <div style={{ gridColumn:"1/-1" }}>
                  <label style={LBL}>{T.fNotes}</label>
                  <textarea rows={3} style={Object.assign({}, INP, { resize:"vertical" })} value={form.notes} onChange={function(e){setF("notes",e.target.value);}} placeholder={isAR?"أي ملاحظات...":"Any notes..."} />
                </div>
              </div>
              <button onClick={submitForm} disabled={busy} style={Object.assign({}, BTN, { width:"100%", marginTop:22, padding:"14px", fontSize:15, opacity: busy ? .7 : 1 })}>
                {busy ? (
                  <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:9 }}>
                    <span style={{ width:16, height:16, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"spin .75s linear infinite" }}/>
                    {T.fSubmitting}
                  </span>
                ) : T.fSubmit}
              </button>
            </div>

            {/* sidebar */}
            <div style={{ position:"sticky", top:78 }}>
              <div style={Object.assign({}, CARD, { border:"1px solid "+accent, marginBottom:14 })}>
                <div style={{ fontSize:12, fontWeight:700, color:muted, marginBottom:14, textTransform:"uppercase", letterSpacing:.4 }}>{T.summaryTitle}</div>
                {nights > 0 ? (
                  [[T.sNights, String(nights)],[T.sPrice,"10 OMR"],[T.sTotal, total+" OMR"],[T.sDeposit, (total/2)+" OMR"]].map(function(r, i) {
                    return (
                      <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom: i < 3 ? "1px solid "+border : "none" }}>
                        <span style={{ color:muted, fontSize:13 }}>{r[0]}</span>
                        <span style={{ fontWeight: i===2 ? 800 : 600, color: i===2 ? accent : text, fontSize: i===2 ? 16 : 13 }}>{r[1]}</span>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ color:muted, fontSize:13, textAlign:"center", padding:"18px 0" }}>{T.sSelectDates}</div>
                )}
              </div>
              <div style={{ background:accentD, border:"1px solid rgba(42,150,72,0.28)", borderRadius:12, padding:"14px", fontSize:13, color:accent, lineHeight:1.7 }}>✓ {T.pricingNote}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  /* ════════════════════════════════════════════
     ADMIN
  ════════════════════════════════════════════ */
  return (
    <div dir={T.dir} style={{ fontFamily: isAR ? "'Tajawal',sans-serif" : "Georgia,serif", background:bg, color:text, minHeight:"100vh" }}>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');*{box-sizing:border-box;margin:0;padding:0;}input:focus,select:focus{border-color:#2a9648!important;}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:#2a9648;border-radius:3px;}"}</style>
      {Nav}

      {!authed ? (
        /* LOGIN */
        <div style={{ minHeight:"88vh", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div style={Object.assign({}, CARD, { maxWidth:400, width:"100%", textAlign:"center" })}>
            <div style={{ width:64, height:64, background: dark ? cardB : "#e6f4ea", borderRadius:"50%", border:"2px solid "+accent, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, margin:"0 auto 18px" }}>🔐</div>
            <h2 style={{ fontSize:19, fontWeight:800, color:text, marginBottom:5 }}>{T.adminTitle}</h2>
            <p style={{ color:muted, fontSize:13, marginBottom:24 }}>{T.adminHint}</p>
            <label style={Object.assign({}, LBL, { textAlign: isAR ? "right" : "left" })}>{T.adminPassLabel}</label>
            <input
              type="password"
              style={Object.assign({}, INP, { borderColor: passErr ? "#ef4444" : inputBr, fontSize:16, letterSpacing:3, textAlign:"center", marginBottom:8 })}
              value={passVal}
              onChange={function(e){ setPassVal(e.target.value); setPassErr(false); }}
              onKeyDown={function(e){ if(e.key==="Enter") tryLogin(); }}
              placeholder="••••••••"
            />
            {passErr && <div style={{ color:"#ef4444", fontSize:12, marginBottom:8, fontWeight:600 }}>⚠ {T.adminWrong}</div>}
            <button onClick={tryLogin} style={Object.assign({}, BTN, { width:"100%", marginTop:6, padding:"12px" })}>{T.adminEnter} →</button>
          </div>
        </div>
      ) : (
        /* DASHBOARD */
        <div style={{ maxWidth:1180, margin:"0 auto", padding:"26px 16px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22, flexWrap:"wrap", gap:10 }}>
            <h1 style={{ fontSize:22, fontWeight:800 }}>{T.adminTitle}</h1>
            <button onClick={logout} style={{ background:"#dc2626", color:"#fff", border:"none", borderRadius:9, padding:"7px 18px", fontSize:13, fontWeight:700, cursor:"pointer" }}>🚪 {T.adminLogout}</button>
          </div>

          {/* stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))", gap:12, marginBottom:24 }}>
            {[[bookings.length,T.statLabels[0],"#2a9648"],[availCnt,T.statLabels[1],"#22c55e"],[reservedCnt,T.statLabels[2],"#f59e0b"],[todayCnt,T.statLabels[3],"#3b82f6"]].map(function(s,i){
              return <div key={i} style={{ background:card, border:"1px solid "+border, borderRadius:13, padding:"18px 20px" }}><div style={{ fontSize:26, fontWeight:900, color:s[2] }}>{s[0]}</div><div style={{ fontSize:12, color:muted, marginTop:3 }}>{s[1]}</div></div>;
            })}
          </div>

          {/* search */}
          <div style={{ position:"relative", marginBottom:18 }}>
            <span style={{ position:"absolute", top:"50%", transform:"translateY(-50%)", [isAR?"right":"left"]:13, color:muted, fontSize:15 }}>🔍</span>
            <input style={Object.assign({}, INP, { [isAR?"paddingRight":"paddingLeft"]:40, maxWidth:400 })} placeholder={T.search} value={search} onChange={function(e){ setSearch(e.target.value); }} />
          </div>

          {/* table */}
          <div style={{ overflowX:"auto", borderRadius:14, border:"1px solid "+border }}>
            <table style={{ width:"100%", borderCollapse:"collapse", background:card, minWidth:780 }}>
              <thead>
                <tr style={{ background:cardB }}>
                  {[T.tSpot,T.tGuest,T.tDates,T.tNights,T.tPay,T.tStatus,T.tActions].map(function(h,i){
                    return <th key={i} style={{ padding:"12px 15px", fontSize:11, fontWeight:700, color:muted, textAlign: isAR?"right":"left", borderBottom:"1px solid "+border, whiteSpace:"nowrap", letterSpacing:.4 }}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {filtered.map(function(b){
                  var ed = editId === b.id;
                  return (
                    <tr key={b.id} style={{ borderBottom:"1px solid "+border }}>
                      <td style={{ padding:"11px 15px" }}>
                        {ed ? <input type="number" style={Object.assign({}, INP, { width:65, padding:"4px 7px", fontSize:12 })} value={editRow.spot} onChange={function(e){ setEditRow(function(r){ var o=Object.assign({},r); o.spot=+e.target.value; return o; }); }}/> : <span style={{ fontWeight:700, color:accent }}>#{b.spot}</span>}
                      </td>
                      <td style={{ padding:"11px 15px" }}>
                        <div style={{ fontWeight:600, fontSize:13 }}>{b.name}</div>
                        <div style={{ fontSize:11, color:muted }}>{b.phone}</div>
                      </td>
                      <td style={{ padding:"11px 15px", fontSize:12, color:muted, whiteSpace:"nowrap" }}>{b.checkin} → {b.checkout}</td>
                      <td style={{ padding:"11px 15px", fontSize:13, fontWeight:700, textAlign:"center" }}>{getNights(b.checkin,b.checkout)}</td>
                      <td style={{ padding:"11px 15px" }}>
                        {ed
                          ? <select style={Object.assign({}, INP, { padding:"4px 7px", fontSize:11 })} value={editRow.pay} onChange={function(e){ setEditRow(function(r){ var o=Object.assign({},r); o.pay=e.target.value; return o; }); }}>{Object.keys(T.payLabels).map(function(k){ return <option key={k} value={k}>{T.payLabels[k]}</option>; })}</select>
                          : <span style={{ fontSize:11, fontWeight:700, padding:"2px 9px", borderRadius:99, background:PAY_COLOR[b.pay]+"22", color:PAY_COLOR[b.pay] }}>{T.payLabels[b.pay]}</span>}
                      </td>
                      <td style={{ padding:"11px 15px" }}>
                        {ed
                          ? <select style={Object.assign({}, INP, { padding:"4px 7px", fontSize:11 })} value={editRow.status} onChange={function(e){ setEditRow(function(r){ var o=Object.assign({},r); o.status=e.target.value; return o; }); }}>{Object.keys(T.statusLabels).map(function(k){ return <option key={k} value={k}>{T.statusLabels[k]}</option>; })}</select>
                          : <span style={{ fontSize:11, fontWeight:700, padding:"2px 9px", borderRadius:99, background:STATUS_COLOR[b.status]+"22", color:STATUS_COLOR[b.status] }}>{T.statusLabels[b.status]}</span>}
                      </td>
                      <td style={{ padding:"11px 15px", whiteSpace:"nowrap" }}>
                        {ed ? (
                          <div style={{ display:"flex", gap:5 }}>
                            <button onClick={function(){ setBookings(function(prev){ return prev.map(function(x){ return x.id===b.id ? Object.assign({},x,editRow) : x; }); }); setEditId(null); }} style={Object.assign({}, BTN, { padding:"4px 11px", fontSize:11, borderRadius:6 })}>{T.save}</button>
                            <button onClick={function(){ setEditId(null); }} style={Object.assign({}, BTNOUT, { padding:"4px 11px", fontSize:11, borderRadius:6 })}>{T.cancel}</button>
                          </div>
                        ) : (
                          <div style={{ display:"flex", gap:5 }}>
                            <button onClick={function(){ setEditId(b.id); setEditRow({ spot:b.spot, pay:b.pay, status:b.status }); }} style={{ background:accentD, color:accent, border:"none", borderRadius:6, padding:"4px 11px", fontSize:11, fontWeight:700, cursor:"pointer" }}>{T.edit}</button>
                            <button style={{ background:goldD, color:gold, border:"none", borderRadius:6, padding:"4px 11px", fontSize:11, fontWeight:700, cursor:"pointer" }}>{T.sendLink}</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && <tr><td colSpan={7} style={{ padding:"36px", textAlign:"center", color:muted, fontSize:13 }}>{T.noResults}</td></tr>}
              </tbody>
            </table>
          </div>

          {/* spot legend */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))", gap:12, marginTop:24 }}>
            {[[T.spotLabels[0],availCnt,"#22c55e"],[T.spotLabels[1],reservedCnt,"#f59e0b"],[T.spotLabels[2],2,"#3b82f6"],[T.spotLabels[3],0,"#ef4444"]].map(function(s,i){
              return (
                <div key={i} style={{ background:card, border:"1px solid "+border, borderRadius:13, padding:"16px 18px", display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:12, height:12, borderRadius:"50%", background:s[2], flexShrink:0, boxShadow:"0 0 7px "+s[2]+"66" }}/>
                  <div><div style={{ fontSize:20, fontWeight:800, color:s[2] }}>{s[1]}</div><div style={{ fontSize:11, color:muted }}>{s[0]}</div></div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
