import { useRouter } from "next/router";
// import { useState } from "react";

// To show active menu in left sidebar
const useMenuSelected = (menu) => {

    const router = useRouter()
    const { pathname } = router
    const arrayOfRoutes = pathname.split('/')
    const mainselected = menu.findIndex((i) => i.menuitems.find((ii) => ii.id === arrayOfRoutes[2]) !== undefined)
    const selected = menu[mainselected]?.menuitems.findIndex((i) => i.id === arrayOfRoutes[2])
    const subSelected = menu[mainselected]?.menuitems[selected].submenu.findIndex((i) => i.id === arrayOfRoutes[3]);
    return { mainselected, selected, subSelected }

}

export default useMenuSelected
