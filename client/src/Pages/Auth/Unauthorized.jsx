import React from 'react'
import { Link } from 'react-router-dom';

export default function Unauthorized() {
    return (
        <div className='flex flex-col items-center'>
            <div className="mt-10 text-red-600 text-xl">
                ⚠️ Unauthorized Access — You don't have permission to view this
                page.
            </div>
            <Link to="/" className="bg-blue-500 mt-12 py-2 px-3 rounded text-slate-200 font-bold text-sm">
                ← Back to Home
            </Link>
        </div>
    );
}
