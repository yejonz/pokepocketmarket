'use client'

import LastActiveUpdater from "@/my_components/lastActiveUpdater";
import MyNavigationMenu from "@/my_components/myNavigationMenu";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function LayoutWrapper ({ children }: { children: React.ReactNode }) {
    const { loading } = useContext(UserContext); 
    
    if (loading) {
      return <div></div>;
    }
  
    return (
      <>
        <MyNavigationMenu />
        <LastActiveUpdater />
        {children}
      </>
    )
}