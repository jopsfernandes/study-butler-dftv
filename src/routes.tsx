import { createHashRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { SignIn } from './screens/signin.tsx';
import { SubjectPanel } from './screens/SubjectPanel.tsx';
import { UserDashboard } from './screens/UserDashboard.tsx';
import { Backpackloader} from './loaders/backpackNotebookLoader.ts';
import { SubjectLoader} from './loaders/subjectLoader';
import {UserSettings} from './screens/UserSettings.tsx';
import Pricing from './screens/Pricing.tsx';
import { UserQuestionExtractor } from './screens/UserQuestionExtractor.tsx';
import { Layout } from './screens/Layout.tsx';
import {Quiz} from './screens/Quiz.tsx';
import { RouteErrorBoundary } from './screens/RouteErrorBoundary.tsx';

export const router = createHashRouter(
    createRoutesFromElements(
        <Route errorElement={<RouteErrorBoundary />}>
            <Route path="/" element={<SignIn />}/>

            <Route path="/backpack" element={<Layout/>}>
             <Route index element={<UserDashboard />} loader={Backpackloader}/>
             <Route path="/backpack/notebooks/:this_notebook_id" element={<SubjectPanel/>} loader={SubjectLoader}/>
             <Route path="/backpack/pricing" element={<Pricing/>}/>
             <Route path="/backpack/user-question-extractor" element={<UserQuestionExtractor/>}/>
             <Route path="/backpack/quiz" element={<Quiz />}/>
            </Route>

            <Route path="/user-settings" element={<UserSettings />}/>
        </Route>
    ));

