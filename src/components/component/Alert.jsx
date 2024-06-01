import { RocketIcon } from "@radix-ui/react-icons"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../ui/alert"
 
export default function AlertUi() {
  return (
    <Alert >
      <RocketIcon className="h-4 w-4" />
      <AlertTitle className="bg-white text-black">Todo created!</AlertTitle>
      <AlertDescription>
        Your todo is successfully created and saved in Database.
      </AlertDescription>
    </Alert>
  )
}
// Copy
// Installation