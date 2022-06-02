import { SvgIcon } from '@material-ui/core';
import React from 'react'
import { useTranslation } from 'react-i18next';


function One(props) {

    const { t } = useTranslation('translation');

    return (
            <svg
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                fill="none"
                viewBox="0 0 1734 1482" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x={30}
                    y={192}
                    width={1674}
                    height={1288}
                    rx={102}
                    fill="#fff"
                    stroke="#000"
                    strokeWidth={4}
                />
                <text
                    transform="translate(504 619)"
                    fill="#000"
                    xmlSpace="preserve"
                    style={{
                        whiteSpace: "pre",
                    }}
                    fontFamily="Helvetica Neue"
                    fontSize={144}
                    letterSpacing="0em"
                >
                    <tspan x={0.195} y={139.208}>
                        {t('testStripInstructions.imageText.twentyMinutes')}
                    </tspan>
                </text>
                <rect
                    x={385}
                    y={869}
                    width={955}
                    height={99}
                    rx={15}
                    fill="#FFFAF2"
                    stroke="#CF9D56"
                    strokeWidth={10}
                />
                <path
                    d="M840 914.5h-5v52.788h52V914.5h-47ZM1050 869.712h-5V922.5h197v-52.788h-192Z"
                    stroke="#CF9D56"
                    strokeWidth={10}
                />
                <path
                    d="M867.368 416.487a8.802 8.802 0 1 0-17.605 0v58.684c0 4.859 3.943 8.803 8.802 8.803h41.079a8.803 8.803 0 1 0 0-17.605h-32.276v-49.882Z"
                    fill="#000"
                />
                <path
                    d="M767.331 432.29a46.897 46.897 0 0 1-17.269-33.981 46.851 46.851 0 0 1 3.064-19.238 46.885 46.885 0 0 1 10.624-16.334 46.947 46.947 0 0 1 16.35-10.614 46.995 46.995 0 0 1 38.095 1.958 46.924 46.924 0 0 1 15.174 12.233 105.588 105.588 0 0 1 33.999-5.581 105.617 105.617 0 0 1 34 5.581 46.931 46.931 0 0 1 15.173-12.233 46.979 46.979 0 0 1 54.446 8.656 46.868 46.868 0 0 1-3.581 69.553 105.655 105.655 0 0 1 5.587 33.967c0 25.97-9.389 49.76-24.975 68.145l22.393 22.371a8.807 8.807 0 0 1 2.8 6.278 8.797 8.797 0 0 1-2.577 6.373 8.8 8.8 0 0 1-6.379 2.575 8.82 8.82 0 0 1-6.285-2.798l-22.392-22.371a105.263 105.263 0 0 1-68.21 24.951c-25.995 0-49.807-9.38-68.209-24.951l-22.393 22.371a8.806 8.806 0 0 1-12.224-.215 8.788 8.788 0 0 1-.216-12.213l22.393-22.371a105.04 105.04 0 0 1-24.975-68.145c0-11.877 1.96-23.309 5.587-33.967Zm.281-36.382a29.193 29.193 0 0 0 7.277 19.322 106.067 106.067 0 0 1 41.404-41.365 29.363 29.363 0 0 0-31.453-4.656 29.326 29.326 0 0 0-12.548 10.816 29.295 29.295 0 0 0-4.68 15.883Zm192.236 19.322a29.296 29.296 0 0 0 7.269-20.287 29.303 29.303 0 0 0-8.578-19.77 29.354 29.354 0 0 0-40.095-1.308 106.067 106.067 0 0 1 41.404 41.365Zm-180.5 51.027a87.893 87.893 0 0 0 25.781 62.18 88.059 88.059 0 0 0 62.239 25.756 88.06 88.06 0 0 0 62.24-25.756 87.893 87.893 0 0 0 25.781-62.18 87.897 87.897 0 0 0-25.781-62.181 88.064 88.064 0 0 0-62.24-25.756 88.063 88.063 0 0 0-62.239 25.756 87.897 87.897 0 0 0-25.781 62.181Z"
                    fill="#000"
                />
                <text
                    fill="#000"
                    xmlSpace="preserve"
                    style={{
                        whiteSpace: "pre",
                    }}
                    fontFamily="Helvetica Neue"
                    fontSize={120}
                    letterSpacing="0em"
                >
                    <tspan textAnchor='center' x="10" width="100%"  y={1166.84}>
                        {t('testStripInstructions.imageText.rest')}
                    </tspan>
                    <tspan x={170.203} y={1309.84}>
                        {t('testStripInstructions.imageText.flat')}
                    </tspan>
                </text>
                <rect
                    x={729.438}
                    y={4.438}
                    width={275.125}
                    height={275.125}
                    rx={84.313}
                    fill="#fff"
                    stroke="#000"
                    strokeWidth={8.875}
                />
                <text
                    fill="#000"
                    xmlSpace="preserve"
                    style={{
                        whiteSpace: "pre",
                    }}
                    fontFamily="Helvetica Neue"
                    fontSize={177}
                    letterSpacing="0em"
                >
                    <tspan x={817.3} y={208.177}>
                        {"4"}
                    </tspan>
                </text>
            </svg>
    )
}

export { One }