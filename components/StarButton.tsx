import { useState } from "react";
import {
  AddStarMutation,
  RemoveStarMutation,
} from "../types/generated/graphql";
import { ADD_STAR, REMOVE_STAR, SEARCH_REPOSITORIES } from "../queries/queries";
import { useMutation } from "@apollo/client";
import type { DEFAULT_STATE } from "../pages";

const StarButton = ({ node, state }: { node: any; state: DEFAULT_STATE }) => {
  const totalCount = node.stargazers.totalCount;
  const [buttonState, setButtonState] = useState({
    text: totalCount === 1 ? "1 Star" : `${totalCount} stars`,
    viewerHasStarred: node.viewerHasStarred,
  });

  // useQueryとは異なり、useMutationはレンダリング時に自動的に処理を実行するわけではない。
  // その代わり、useMutationから返されるmutat関数を実行する
  const [addStar] = useMutation<AddStarMutation>(ADD_STAR);
  const [removeStar] = useMutation<RemoveStarMutation>(REMOVE_STAR, {
    update(cache, { data }) {
      const response = data?.removeStar;
      // readQueryメソッドを使うと、キャッシュ上で直接GraphQLクエリを実行することができる。
      const existingCache = cache.readQuery({
        query: SEARCH_REPOSITORIES,
        variables: { ...state },
      });

      if (response && existingCache) {
        // @ts-ignore
        const edges = existingCache.search.edges;
        // @ts-ignore
        const newEdges = edges.map((edge) => {
          if (edge.node.id === node.id) {
            const totalCount = edge.node.stargazers.totalCount;
            const diff = buttonState.viewerHasStarred ? -1 : 1;
            const newTotalCount = totalCount + diff;
            edge.node.stargazers.totalCount = newTotalCount;
          }
          return edge;
        });
        // @ts-ignore
        data.search.edges = newEdges;

        // writeQueryメソッドを使用すると、GraphQLクエリにマッチした形でキャッシュにデータを書き込むことができる
        // readQueryに似ていますが、dataオプションが必要な点が異なります。
        cache.writeQuery({
          query: SEARCH_REPOSITORIES,
          data,
        });
      }
    },
  });

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
