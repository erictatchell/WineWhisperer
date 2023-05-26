import { ReactNode } from 'react';

// Define the type for the properties the FormLayout component expects. 
// In this case, it's expecting a 'children' property, which is of type ReactNode.
interface FormProps {
    children: ReactNode;
}

// Define the FormLayout component. This is a Functional Component that takes formProps as its props.
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
