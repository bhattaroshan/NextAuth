import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/home', request.url))
    const path = request.nextUrl.pathname;

    const token = request.cookies.get('token')?.value || ''

    if(token.length>0){ //user is already logged in
        if(path==='/signup'){
            return NextResponse.redirect(new URL('/profile',request.url));
        }
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/signup',
    '/login'
]

}