This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[next-i18next docs:](https://www.npmjs.com/package/next-i18next)

## Steps

### 1: Create next-i18next.config.js

```js
module.exports = {
    i18n: {
        defaultLocale: "en",
        locales: ["en", "bn", "ar", "hi"],
    },
};
```

### 2: Add exported i18 to next config

```js
/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
    reactStrictMode: true,
    i18n,
};

module.exports = nextConfig;
```

### 3: Wrap \_app with appWithTranslation HOC

```js
export default appWithTranslation(MyApp);
```

### 4: Create Locales in public -> locales -> en -> common.json

### 5: Using Translation to Components

```js
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export default function Home(props) {
    const { t } = useTranslation("home");
    <h1>{t("our_universe")}</h1>;
}
// Eta na use korle locales json pabena
export const getStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["home"])),
            data: "ki hocche",
        },
    };
};
```

### 6: Change Locale: it will change url with current locale

```js
// Using Link to change locale
{
    locales.map((loc) => (
        <Link key={loc} href={"/"} locale={loc}>
            <button>{loc}</button>
        </Link>
    ));
}
// Using useRouter {push} to change locale
const handleClick = (e) => {
    push("/", undefined, { locale: "ar" });
};

<button onClick={handleClick}>PUSH ARABIC LANG</button>;
```
