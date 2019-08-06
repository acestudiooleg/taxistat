import { all } from "redux-saga/effects";
import counter from "./counter";

export default function createRootSaga() {
  const sagas = [counter()];

  return function* rootSaga() {
    yield all(sagas);
  };
}
