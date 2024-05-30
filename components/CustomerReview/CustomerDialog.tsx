import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React from 'react'
import { Textarea } from "../ui/textarea"

function CustomerDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-black active:scale-95 ">Write A Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share Ur journey with US</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid w-full gap-2">
                        <Textarea placeholder="Type your message here." />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Send message</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CustomerDialog
