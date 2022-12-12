import React, { createContext, useContext, useEffect, useState } from "react";

const Theme = createContext()

export default function ThemeContext({ children }){
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [bgColor, setBgColor] = useState("#fff")
    const [btnColor, setBtnColor] = useState("#0724ea")
    const [btnTextColor, setBtnTextColor] = useState("#fff")
    const [btnHover, setBtnHover] = useState("#1d1d1d")
    const [textColor, setTextColor] = useState("#707286")
    const [mainHeading, setMainHeading] = useState("#1d0a3c")
    const [subTitles, setSubTitles] = useState("#545563")
    const [accent, setAccent] = useState("#d1410a")
    const [categoryBtns, setCategoryBtns] = useState("#545563")
    const [cBoxShadow, setCBoxShadow] = useState("5px 5px #d1410a")
    const [cardBg, setCardBg] = useState("#fff")
    const [cardHover, setCardHover] = useState("rgba(0, 0, 0, 0.56) 0px 22px 70px 4px")
    const [formTextC, setFormTextC] = useState("#545563")
    const [formAccent, setFormAccent] = useState("#545563")
    const [formBg, setFormBg] = useState("#fff")
    const [iconsC, setIconsC] = useState("#0724ea")
    const [bColor, setBColor] = useState("1px solid #1d1d1d")

    useEffect(() => {
        if(isDarkMode === true) {
            setBgColor("#1d1d1d")
            setBtnColor("#03DAC5")
            setBtnTextColor("#1d1d1d")
            setBtnHover("#fff")
            setTextColor("#e1e1e1")
            setMainHeading("#fff")
            setSubTitles("#fff")
            setAccent("#03DAC5")
            setCategoryBtns("#e1e1e1")
            setCBoxShadow("5px 5px #03DAC5")
            setCardBg("#707286")
            setCardHover("#03DAC5 0px 22px 70px 4px")
            setFormTextC("#fff")
            setFormAccent("#fff")
            setFormBg("#0a1929")
            setIconsC("#03DAC5")
            setBColor("1px solid #fff")
        }
        else if(isDarkMode === false) {
            setBgColor("#fff")
            setBtnColor("#0724ea")
            setBtnTextColor("#fff")
            setBtnHover("#1d1d1d")
            setTextColor("#707286")
            setMainHeading("#1d0a3c")
            setSubTitles("#545563")
            setAccent("#d1410a")
            setCategoryBtns("#545563")
            setCBoxShadow("5px 5px #d1410a")
            setCardBg("#fff")
            setCardHover("rgba(0, 0, 0, 0.56) 0px 22px 70px 4px")
            setFormTextC("#545563")
            setFormAccent("#545563")
            setFormBg("#fff")
            setIconsC("#0724ea")
            setBColor("1px solid #1d1d1d")
        };

    }, [isDarkMode]);

    return (
        <div>
            <Theme.Provider value={{
                isDarkMode, 
                bgColor,
                mainHeading,
                categoryBtns,
                cardHover,
                iconsC,
                formBg,
                bColor,
                formAccent,
                formTextC,
                cardBg,
                cBoxShadow,
                accent,
                subTitles,
                textColor, 
                btnHover, 
                btnTextColor, 
                btnColor, 
                setIsDarkMode
                }}>
                {children}
            </Theme.Provider>
        </div>
    )
}

export function ThemeState (){
   return useContext(Theme);
}