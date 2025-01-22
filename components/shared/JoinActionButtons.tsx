'use client'

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { handleJoinStatusUpdate } from "@/lib/actions/post.actions"

interface JoinActionButtonsProps {
    joinId: string
}

export default function JoinActionButtons({ joinId }: JoinActionButtonsProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleAction = async (status: 'approved' | 'rejected') => {
        try {
            setIsLoading(true)
            const result = await handleJoinStatusUpdate(joinId, status)
            
            if (result.success) {
                toast({
                    title: "Success",
                    description: `Request ${status} successfully`,
                    variant: "default",
                })
            } else {
                throw new Error("Failed to update status")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update request status",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex gap-2 mt-4">
            <Button
                onClick={() => handleAction('approved')}
                disabled={isLoading}
                className="bg-primary-100 text-white hover:bg-primary-200 transition-colors"
            >
                {isLoading ? "Processing..." : "Approve"}
            </Button>
            <Button
                onClick={() => handleAction('rejected')}
                disabled={isLoading}
                className="bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
                {isLoading ? "Processing..." : "Reject"}
            </Button>
        </div>
    )
}