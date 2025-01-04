"use client";
import {Button} from "../ui/button"
import {useRouter} from "next/navigation"

const CardActions = ({ postId }) => {
    const router = useRouter()
    const handleOnClick = () =>{
        router.push(`/hub/${postId}`)
    }

    const handleJoin = () =>{

    }

  return (
    <div className="flex gap-2 w-full">
      <Button variant="outline" className="flex-1" onClick={handleOnClick}>
        Read More
      </Button>
      <Button className="flex-1 hover:bg-primary-200 bg-primary-100">
        Join
      </Button>
    </div>
  );
};

export default CardActions;
