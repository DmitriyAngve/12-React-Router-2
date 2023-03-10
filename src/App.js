import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import BlogPage, { loader as postsLoader } from "./pages/Blog";
import HomePage from "./pages/Home";
// import PostPage, { loader as postLoader } from "./pages/Post";
import RootLayout from "./pages/Root";

const BlogPage = lazy(() => import("./pages/Blog"));
const PostPage = lazy(() => import("./pages/Post"));
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
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: () =>
              import("./pages/Blog").then((module) => module.loader()),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
              </Suspense>
            ),
            loader: (meta) =>
              import("./pages/Post").then((module) => module.loader(meta)),
          },
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
// All of that will be done by loading this lazily. This import function will only be executed once the "loader", for the "BlogPage" is executed. So only once we try to visit the "BlogPage". Only then the blog file will be imported and this loader function from that file will be executed.
// 1.6 Next step to also load the "BlogPage" component lazily. Add "BlogPage" component function, where we dynamically import "BlogPage" component file. In there our default export is that blog page component. /// "const BlogPage = () => import("./pages/Blog")"
// "import("./pages/Blog");" - this is not a valid functional component. function is only a valid function component if it returns JSX code. This function returns a promise (because import actually yields a promise).
// 1.7 To solve this problem React gives us a special function which we have to wrap around this ("import()") function. That's the "lazy()" function which is imported from React. /// "const BlogPage = lazy(() => import("./pages/Blog"))"
// "lazy()" is executed and takes this "import()" function with the dynamic "import" as an argument. And now blog page can indeed be used as a component.
// 1.8 "<BlogPage>" - this code will now work again. But we need to wrap the code in <Suspense>.
// "<Suspense>" wait for content to be loaded before actually rendering the content.
// 1.9 Add "fallback" prop on "<Suspense>" until that component code is there. /// "<Suspense fallback={<p>Loading...</p>}>"
// With that we're now loading this block page component ("<BlogPage />") only then it's needed and we show a "fallback" ("{<p>Loading...</p>}") until the code is there and we're also loading that loader code (""./pages/Blog").then((module) => module.loader()") only when  it's needed, and then we execute it right away so that we overall, still load the data as required.

//

// STEP 2:
// Add lazy loading for "import PostPage, { loader as postLoader } from "./pages/Post";"
// 2.1 Add "meta" object provided by r-r-d.
// 328. Adding Lazy Loading
