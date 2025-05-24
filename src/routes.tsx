import { createHashRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { SignIn } from './screens/signin.tsx';
import { Dashboard } from './screens/Dashboard.tsx';
import { UserDashboard } from './screens/UserDashboard.tsx';
import { loader as notebookLoader } from './loaders/notebookLoader';
import { CadernoLoader} from './loaders/cadernoLoader.tsx';
import {UserSettings} from './screens/UserSettings.tsx';
import Pricing from './screens/Pricing.tsx';
import { UserQuestionExtractor } from './screens/UserQuestionExtractor.tsx';
import { Layout } from './screens/Layout.tsx';
import {Quiz} from './screens/Quiz.tsx';

export const router = createHashRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<SignIn />}/>
            
            <Route path="/user-dashboard" element={<Layout/>}>
             <Route index element={<UserDashboard />} loader={notebookLoader}/>
             <Route path="/user-dashboard/caderno/:id" element={<Dashboard />} loader={CadernoLoader}/>
             <Route path="/user-dashboard/pricing" element={<Pricing/>}/>
             <Route path="/user-dashboard/user-question-extractor" element={<UserQuestionExtractor/>}/>
             <Route path="/user-dashboard/quiz" element={<Quiz />}/>
            
            </Route>
            


          
            <Route path="/user-settings" element={<UserSettings />}/>

            
            


        </>

    ));

