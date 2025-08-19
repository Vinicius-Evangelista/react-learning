import {Alert} from './Alert';
import './App.css';

export default function App() {
    return (
        <div >
            <Alert heading="Success" closable>
                Everything is really good!
            </Alert>
        </div>
    );
}
