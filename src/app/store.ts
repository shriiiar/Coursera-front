import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userApi from "../features/api/userApi";
import coursesApi from "../features/coursesSlice/courseApi";
import teacherApi from "../features/coursesSlice/teacherApi";
import studentApi from "../features/coursesSlice/studentApi";
import quizSliceReducer from "../features/coursesSlice/quizSlice";
import chatSliceReducer from "../features/coursesSlice/chatSlice";
import chatApi from "../features/api/chatApi";
import googleDriveApi from "../features/coursesSlice/googleDriveApi";
const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [teacherApi.reducerPath]: teacherApi.reducer,
    [googleDriveApi.reducerPath]: googleDriveApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    quiz: quizSliceReducer,
    chat: chatSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      coursesApi.middleware,
      teacherApi.middleware,
      studentApi.middleware,
      googleDriveApi.middleware,
      chatApi.middleware
    ),
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
