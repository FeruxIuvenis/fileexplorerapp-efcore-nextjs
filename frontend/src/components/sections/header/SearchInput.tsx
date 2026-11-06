import { Button, Input } from "@/components/ui";
import { XIcon } from "lucide-react";

const SearchInput = () => {
    return (
        <div className="flex items-center gap-2 flex-row bg-accent rounded-sm">
            <Input placeholder="Search..." className="bg-transparent" />
            <Button variant="ghost" size="icon">
                <XIcon />
            </Button>
        </div>
    )
}

export default SearchInput