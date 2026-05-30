"use client" 
import { Button } from "@/components/ui/button"
import { deleteDepartment } from "./dashboard.server"
import { Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
export default function DeleteButton({id}: {id: number}) {
    return(
        <AlertDialog>
  <AlertDialogTrigger asChild>
                <Button
                variant="destructive" 
                size="sm" 
                className="flex-1 gap-1.5 text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 hover:border-rose-500/30 cursor-pointer"
            >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
            </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the whole department with details and physicians
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel >Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive" onClick={ async()=> await deleteDepartment(id)}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    )

}