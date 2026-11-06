import { Card } from "@/components/ui"
import SearchInput from "./SearchInput"
import PathBreadcrumb from "./PathBreadcrumb"

const Header = () => {
    return (
        <Card className="w-full flex items-center p-4 flex-row rounded-md">
            <SearchInput/>
            <div className="flex items-center gap-2 flex-row">
                <PathBreadcrumb/>
            </div>
        </Card>
    )
}

export default Header