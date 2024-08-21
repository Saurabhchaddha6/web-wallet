"use client"
import { Moon, SunDim } from 'lucide-react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { Switch } from './ui/switch'

const ThemeButton = () => {
  const {theme, setTheme} = useTheme()
  const [mounted,setMounted]  = useState(false)

  useEffect(()=>{
    setMounted(true);
    },[])
  
    if(!mounted) return null;

    const isDarkMode = 
    theme ==="dark" ||
    (theme ==="system" && 
        window.matchMedia("(prefers-colors-schema: dark)").matches
    )

    return (
    <div>
        <div className="flex items-center gap-2">
      <SunDim
        className={`h-5 w-5 ${isDarkMode ? "text-primary/50" : "text-primary"}`}
      />
      <Switch
        checked={isDarkMode}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <Moon
        className={`h-5 w-5 ${isDarkMode ? "text-primary" : "text-primary/50"}`}
      />
    </div>
    </div>
  )
}

export default ThemeButton
