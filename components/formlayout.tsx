import { ReactNode } from 'react';

interface FormProps {
    children: ReactNode;
}

const FormLayout: React.FC<FormProps> = ({ children }) => {
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full">
            <div className="max-w-lg mx-auto p-4 pb-16 bg-black/10 backdrop-blur-md">
                {children}
            </div>
        </div>
    );
}

export default FormLayout;
