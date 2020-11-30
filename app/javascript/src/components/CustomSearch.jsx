import React from "react";
import { useHistory } from "react-router-dom";
import { Search, List } from "semantic-ui-react";
import { searchRequestHandler } from "../searchUtility";

const initialState = {
  loading: false,
  results: [],
  value: "",
};

function searchReducer(state, action) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return initialState;
    case "START_SEARCH":
      return { ...state, loading: true, value: action.query };
    case "FINISH_SEARCH":
      return { ...state, loading: false, results: action.results };
    case "SELECTION":
      return { ...state, value: action.selection };

    default:
      throw new Error();
  }
}

function CustomSearch() {
  const [state, dispatch] = React.useReducer(searchReducer, initialState);
  const { loading, results, value } = state;
  let history = useHistory();

  const timeoutRef = React.useRef();
  console.log("function start");
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: "START_SEARCH", query: data.value });
    console.log(" search start ");
    timeoutRef.current = setTimeout(() => {
      if (data.value.trim().length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }

      searchRequestHandler(
        data.value.trim(),
        localStorage.getItem("token")
      ).then((response) =>
        dispatch({ type: "FINISH_SEARCH", results: response.users })
      );
    }, 300);
  }, []);

  const displayData = (result) => {
    return <List>{result.username}</List>;
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  console.log(results);
  return (
    <Search
      loading={loading}
      onResultSelect={(e, data) => {
        dispatch({ type: "SELECTION", selection: data.result.username });
        console.log("clicked");
        history.push(`/find_user/${data.result.username}`);
      }}
      onSearchChange={handleSearchChange}
      results={results}
      resultRenderer={displayData}
      value={value}
    />
  );
}

export default CustomSearch;
