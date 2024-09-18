"use client";
import React, { Fragment } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { useLocale } from "@/context/LocaleProvider";

export default function BreadCrumb() {
    const paths: string = usePathname();
    const { dir } = useLocale();

    // Filter out 'En' and 'Ar' from the path segments
    const pathNames: string[] = paths
        .split("/")
        .filter(
            (path) =>
                path &&
                path.toLowerCase() !== "en" &&
                path.toLowerCase() !== "ar"
        );

    return (
        <Breadcrumb dir={dir} className="ml-10 p-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink>Home</BreadcrumbLink>
                </BreadcrumbItem>
                {pathNames.length > 0 && <BreadcrumbSeparator />}

                {pathNames.map((link, i) => {
                    const linkName =
                        link.charAt(0).toUpperCase() + link.slice(1);
                    const isLastPath = pathNames.length === i + 1;
                    return (
                        <Fragment key={i}>
                            <BreadcrumbItem>
                                {!isLastPath ? (
                                    <BreadcrumbLink>{linkName}</BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage>{linkName}</BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                            {!isLastPath && <BreadcrumbSeparator />}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}