import "styles/global/typography.scss";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "styles/global/ThemeConfig";
import DarkModeToggle from "react-dark-mode-toggle";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CodeThemeStyle } from "styles/global/CodeThemeConfig";
import { darkTheme } from "styles/global/Themes/DarkTheme";
import { lightTheme } from "styles/global/Themes/LightTheme";
import Image from "next/image";

const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`;

export default function App({ Component, pageProps }) {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const initialValue = window.localStorage.getItem("dark-mode");
        setDarkMode(initialValue == null ? true : initialValue == "true");
    }, []);

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                <CodeThemeStyle />
                <GlobalStyles />
                <div className="container">
                    <div className="app">
                        <Header className="app-header">
                            <Link href="/">
                                <a className="home-button">
                                    <Image
                                        width={30}
                                        height={30}
                                        src="/icons/home.svg"
                                        alt="home"
                                    />
                                </a>
                            </Link>
                            <DarkModeToggle
                                checked={darkMode}
                                onChange={(value) => {
                                    window.localStorage.setItem(
                                        "dark-mode",
                                        value
                                    );
                                    setDarkMode(value);
                                }}
                                size={60}
                            />
                        </Header>
                        <Component {...pageProps} />
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
}
