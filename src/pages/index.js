import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home(props) {
    // i18 Hooks
    const { t } = useTranslation("home");

    // use Push to change locale | use Link to change locale
    const { locale, locales, push } = useRouter();

    const handleClick = (e) => {
        push("/", undefined, { locale: "ar" });
    };
    return (
        <main className="max-w-[1120px] mx-auto min-h-screen py-5 relative">
            {/* <Button variant="green">Hello Variant</Button> */}
            <p className="font-medium mb-5">Current Locale: {locale}</p>
            <div className="text-xl md:text-5xl font-bold text-slate-900">{t("our_universe")}</div>
            <p className="mt-10 text-lg font-medium text-slate-800 antialiased">{t("our_universe_paragraph")}</p>

            <div className="absolute bottom-5 left-0 flex gap-x-3">
                {locales.map((loc) => (
                    <Link key={loc} href={"/"} locale={loc} className="uppercase">
                        <button className="bg-blue-800 hover:bg-opacity-80 text-white font-bold  py-2 px-3">
                            {loc}
                        </button>
                    </Link>
                ))}
                <button
                    onClick={handleClick}
                    className="bg-blue-800 hover:bg-opacity-80 text-white font-bold  py-2 px-3"
                >
                    PUSH ARABIC LANG
                </button>
            </div>
        </main>
    );
}

// Eta diyei public -> locales pacche
export const getStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["home"])),
            data: "ki hocche",
        },
    };
};
