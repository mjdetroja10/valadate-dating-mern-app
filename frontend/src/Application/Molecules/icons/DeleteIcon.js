export const DeleteIcon = (props) => (
    <svg
        fill="red"
        viewBox="0 0 24 24"
        id="delete"
        data-name="Flat Line"
        xmlns="http://www.w3.org/2000/svg"
        className="icon flat-line"
        {...props}
    >
        <path
            id="secondary"
            d="M5,8H18a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H5a0,0,0,0,1,0,0V8A0,0,0,0,1,5,8Z"
            transform="translate(26 2) rotate(90)"
            style={{
                fill: 'red',
                strokeWidth: 2,
            }}
        />
        <path
            id="primary"
            d="M16,7V4a1,1,0,0,0-1-1H9A1,1,0,0,0,8,4V7"
            style={{
                fill: 'none',
                stroke: 'red',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 2,
            }}
        />
        <path
            id="primary-2"
            data-name="primary"
            d="M17,21H7a1,1,0,0,1-1-1V7H18V20A1,1,0,0,1,17,21ZM4,7H20"
            style={{
                fill: 'none',
                stroke: 'red',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                strokeWidth: 2,
            }}
        />
    </svg>
)
