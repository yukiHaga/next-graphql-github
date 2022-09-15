import { useState } from "react";
import {
  AddStarMutation,
  RemoveStarMutation,
} from "../types/generated/graphql";
import { ADD_STAR, REMOVE_STAR } from "../queries/queries";
import { useMutation } from "@apollo/client";

const StarButton = ({ node }: { node: any }) => {
  const totalCount = node.stargazers.totalCount;
  const [buttonState, setButtonState] = useState({
    text: totalCount === 1 ? "1 Star" : `${totalCount} stars`,
    viewerHasStarred: node.viewerHasStarred,
  });
  const [addStar] = useMutation<AddStarMutation>(ADD_STAR);
  const [removeStar] = useMutation<RemoveStarMutation>(REMOVE_STAR);

  const handleClick = async () => {
    try {
      if (buttonState.viewerHasStarred) {
        await removeStar({
          variables: {
            input: {
              starrableId: node.id,
            },
          },
        }).then((result) => {
          setButtonState((prev) => ({
            ...prev,
            viewerHasStarred:
              result.data?.removeStar?.starrable?.viewerHasStarred,
          }));
        });
      } else {
        await addStar({
          variables: {
            input: {
              starrableId: node.id,
            },
          },
        }).then((result) => {
          setButtonState((prev) => ({
            ...prev,
            viewerHasStarred: result.data?.addStar?.starrable?.viewerHasStarred,
          }));
        });
      }
    } catch (err) {
      // @ts-ignore
      alert(err.message);
    }
  };

  return (
    <button onClick={handleClick}>
      {buttonState.text} | {buttonState.viewerHasStarred ? "starred" : "-"}
    </button>
  );
};

export default StarButton;
