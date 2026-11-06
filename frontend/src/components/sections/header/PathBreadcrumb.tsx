import { Breadcrumb, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui";

const PathBreadcrumb = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbLink>School</BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbLink>Math</BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbLink>Seminars</BreadcrumbLink>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default PathBreadcrumb