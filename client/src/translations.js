import { setLocale, setTranslations } from "react-i18nify";

setTranslations({
	en: {
		latest: "Latest",
		seeMore: "See more",
		readMore: "Read more",
		products: "Products",
		nurseries: "Nurseries",
		aboutUs: "About Us",
		dashboard: "Dashboard",
		signUp: "Sign-up",
		signIn: "Sign-in",
		user: "User",
		nursery: "Nursery",
		signUpAsUser: "Sign-up as User",
		signInAsUser: "Sign-in as User",
		signUpAsNursery: "Sign-up as Nursery",
		signInAsNursery: "Sign-in as Nursery",
		submit: "Submit",
	},
	ur: {
		latest: "تازہ ترین",
		seeMore: "مزید دیکھیں",
		readMore: "مزید پڑھیں",
		products: "مصنوعات",
		nurseries: "نرسریاں",
		aboutUs: "ہمارا تعارف",
		dashboard: "ڈیش بورڈ",
		signUp: "اکاؤنٹ بنائیں",
		signIn: "سائن ان",
		user: "صارف",
		nursery: "نرسری",
		signUpAsUser: "صارف اکاؤنٹ بنائیں",
		signInAsUser: "صارف سائن ان",
		signUpAsNursery: "نرسری اکاؤنٹ بنائیں",
		signInAsNursery: "نرسری سائن ان",
		submit: "جمع کریں",
	},
});

const locale = window.localStorage.getItem("locale");
setLocale(locale || "en");
