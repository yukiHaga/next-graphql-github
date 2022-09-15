import { SearchRepositoriesQuery } from "../types/generated/graphql";

const StarButton = ({ node }: { node: any }) => {
  const totalCount = node.stargazers.totalCount;
  const buttonText = totalCount === 1 ? "1 Star" : `${totalCount} stars`;
  const viewerHasStarred = node.viewerHasStarred;
  return (
    <button>
      {buttonText} | {viewerHasStarred ? "starred" : "-"}
    </button>
  );
};

export default StarButton;
