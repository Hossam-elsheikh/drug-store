import React, { useState } from 'react';
import {  MessageCircleMore, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import StarRating from "./StarRating";
import { addReview } from '@/axios/instance';
import useAuth from '@/hooks/useAuth';

function CustomerCommentDialog({ productId }: { productId: string }) {
    const { auth: { userId } }: any = useAuth();
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [isOpen, setIsOpen] = useState(false); 

    const handleSetRating = (newRating: number) => {
        setRating(newRating);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const customerComment: ReviewData = {
        comment,
        rating,
    };

    const handleSubmit = async () => {
        try {
            await addReview(userId, productId, customerComment);
            setRating(0);
            setComment("");
            setIsOpen(false); // Close the dialog after successful submission
        } catch (error) {
            console.error("Failed to submit comment:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 active:scale-[.99] focus:outline-none transition-all duration-200 group">
                    <MessageCircleMore size={24}  />
                    Write A Comment
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-50">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-blue-600">Share Your Journey With Us</DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Your feedback helps us improve. Tell us about your experience!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid w-full gap-2">
                        <Textarea
                            placeholder="Type your Comment here..."
                            className="min-h-[100px] p-3 border-2 border-gray-300 rounded-md outline-none focus:ring-0 transition-all duration-200"
                            value={comment}
                            onChange={handleCommentChange}
                        />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Rate your experience:</p>
                        <StarRating
                            mode="rating"
                            size={30}
                            onSetRating={handleSetRating}
                            defaultRating={rating}
                        />
                    </div>
                </div>
                <DialogFooter className="w-full">
                    <Button
                        type="submit"
                        className="bg-green-500 w-full hover:bg-green-600 gap-2 rounded-full text-white transition-all duration-200 active:scale-[.99]"
                        onClick={handleSubmit}
                    >
                        <Send size={24}  />
                        Submit Comment
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CustomerCommentDialog;
