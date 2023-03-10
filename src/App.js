import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import BlogPage, { loader as postsLoader } from "./pages/Blog";
import HomePage from "./pages/Home";
import PostPage, { loader as postLoader } from "./pages/Post";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "posts",
        children: [
          {
            index: true,
            element: <BlogPage />,
            loader: () =>
              import("./pages/Blog").then((module) => module.loader()),
          },
          { path: ":id", element: <PostPage />, loader: postLoader },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// 328. Adding Lazy Loading

// STEP 1:
// 1.1 In order to load this blog page lazily we first of all have to remove import "BlogPage"
// 1.2 Next step we have to re-add it ("BlogPage") but in a way that it's only loaded when it's needed. We actually import two things in import.
// 1.3 Let's start with the loader. Replace the loader to function. That's should be a function, when in the end call at import function. /// "loader: () => import()"
// Now this import keyword, which we use for import files, but it turns out that you can actually also call import as a function and in that case it will import something dynamically, only when it's needed.
// 1.4 To this dynamic import I pass a path to pages Blog, then import gives you a promise. Because here we see a acynchronous process, which can take a bit longer. /// "loader: () => import("./pages/Blog").then()"
// So "import()" gives you a promise and we can change the ".then" keyword here.
// 1.5 And then what we get here is the loaded "module", so the loaded file in the end. And on that module I now wanna return the loader function. The loader should be executed. /// "import("./pages/Blog").then((module) => module.loader())"
// All of that will be done by loading this lazily. This import function will only be executed once the "loader", for the "BlogPage" is executed. So only once we try to visit the "BlogPage". Only then the blog file will be imported
// 328. Adding Lazy Loading
