import { Button, Flex } from "antd";
import type React from "react";

interface PageProps {
    navbarName: string,
    additionalComponent?: React.ReactNode
}


function NavBar({ navbarName, additionalComponent }: PageProps) {

    return <>
        <Flex className="justify-between p-5!">
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-foreground truncate">{navbarName}</span>
            <div className="flex justify-between">
                {/* ! Da rifare */}
                <Button>Lingua</Button>
                <div>
                    {additionalComponent}
                </div>
            </div>

        </Flex>
    </>
}

export default NavBar;