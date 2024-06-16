import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ModalProps = {
    buttonText: string,
    hideQuickAccess: ()=>void
  
};

export function Modal({ buttonText,hideQuickAccess }: ModalProps) {
 

    return (
        <Dialog >
          
            <DialogTrigger asChild>
            <button  className="bg-white px-3 w-3/5 hover:scale-105 duration-300 text-sm py-2 rounded-full text-primaryColor hover:bg-secColor hover:text-slate-100 font-medium ">
                {buttonText}
            </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md" >
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue="https://ui.shadcn.com/docs/installation"
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3" onClick={() => navigator.clipboard.writeText("https://ui.shadcn.com/docs/installation")}>
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose onClick={hideQuickAccess} asChild>
                        <Button type="button"  variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
