import { useState } from "react";
import { AddStarMutation } from "../types/generated/graphql";
import { ADD_STAR } from "../queries/queries";
import { useMutation } from "@apollo/client";

const StarButton = ({ node }: { node: any }) => {
  const totalCount = node.stargazers.totalCount;
  const [buttonState, setButtonState] = useState({
    text: totalCount === 1 ? "1 Star" : `${totalCount} stars`,
    viewerHasStarred: node.viewerHasStarred,
  });
  const [addStar] = useMutation<AddStarMutation>(ADD_STAR);

  const handleClick = async () => {
    try {
      await addStar({
        variables: {
          input: {
            starrableId: node.id,
          },
        },
      }).then((result) =>
        setButtonState((prev) => ({
          ...prev,
          text: totalCount === 1 ? "1 Star" : `${totalCount} stars`,
          viewerHasStarred: result.data?.addStar?.starrable?.viewerHasStarred,
        }))
      );
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
