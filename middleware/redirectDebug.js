// middleware/redirectDebug.js
// development環境以外で、debugと名前に含まれるurlは404へリダイレクト
export default function ({ route, redirect }) {
    if (process.env.NODE_ENV !== "development") {
        if (route.name && route.name.includes('debug')) {
            return redirect('/404');
        }
    }
}