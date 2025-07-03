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
import { Button } from "@/components/ui/button"
import { useDeleteBookMutation } from "@/services/books"
import {Trash2 } from "lucide-react"
import { toast } from "sonner"

export function DeleteAlert(id:any) {
  
  const [deleteBook]=useDeleteBookMutation(undefined)
  const handleDelete =async(id:string)=>{
    console.log("id in handle delete",id)
    try{
        const result=await deleteBook(id).unwrap()
        console.log(result);
        if(result.success)
          toast.success("Book deleted successfully")
    }catch(error){
      toast.error('Error deleting book')
    }
    
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline"><Trash2/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>handleDelete(id)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
