import React, { useState } from 'react'
import { MessageCircleMore, Pencil, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '../ui/textarea'
import StarRating from './StarRating'
import { addReview, updateReview } from '@/axios/instance'
import useAuth from '@/hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import { useLocale } from '@/context/LocaleProvider'
import { useTranslations } from 'next-intl'

type Props = {
    isEdit: boolean
    postHandler: () => void
    productId?: string
    rateId?: string
}

function CustomerCommentDialog({ productId, isEdit, postHandler,rateId }: Props) {
    const {
        auth: { userId },
    }: any = useAuth()
    const t = useTranslations('customerReview')

    const [comment, setComment] = useState('')
    const [rate, setRating] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState('')
    const handleSetRating = (newRating: number) => {
        setRating(newRating)
    }

    const handleCommentChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setComment(event.target.value)
    }
    const addReviewMutation = useMutation({
        mutationFn: isEdit ? updateReview :  addReview,
        onSuccess: () => {
            setRating(0)
            setComment('')
            setIsOpen(false)
            postHandler()
        },
        onError: (err) => {
            setError(err.message)
        },
    })

    const handleSubmit = async () => {
        addReviewMutation.mutate({ userId, productId, rate, comment,reviewId:rateId })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
            <DialogTrigger asChild>
                {isEdit ? (
                    <Pencil className="cursor-pointer hover:text-gray-800 hover:scale-105" />
                ) : (
                    <Button
                        variant="outline"
                        className="items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 active:scale-[.99] focus:outline-none transition-all duration-200 group"
                    >
                        <MessageCircleMore size={24} />
                        {t('writeComment')}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-50">
                <DialogHeader  >
                    <DialogTitle className="text-2xl font-bold text-blue-600">
                        {t('shareExp')}
                    </DialogTitle>
                    <DialogDescription  className="text-gray-600">
                        {t('yourFeedback')}
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
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            {t('rate')}
                        </p>
                        <StarRating
                            mode="rating"
                            size={30}
                            onSetRating={handleSetRating}
                            defaultRating={rate}
                        />
                    </div>
                </div>
                <DialogFooter className="w-full">
                    {error && (
                        <p className="text-red-500 font-medium text-sm">
                            {error}
                        </p>
                    )}
                    <Button
                        type="submit"
                        className="bg-green-500 w-full hover:bg-green-600 gap-2 rounded-full text-white transition-all duration-200 active:scale-[.99]"
                        onClick={handleSubmit}
                    >
                        <Send size={24} />
                        {t('comment')}

                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CustomerCommentDialog
