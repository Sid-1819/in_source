import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs';
import React from 'react'
import ApplicantsList from '../participants/page';
import WinnersList from '../winners/page';
import RulesTab from './rules-tab/page';
import GuidelinesTab from './guidelines-tab/page';
import MoreInfoTab from './more-info/page';

const InformationPage = () => {
    return (
        <div className="mx-auto w-full max-w-3xl">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
             
              <TabsTrigger value="rules" className="flex items-center gap-2">
                {/* <Info className="h-4 w-4" /> */}
                <span className="hidden md:inline">Rules</span>
              </TabsTrigger>
              <TabsTrigger value="guidelines" className="flex items-center gap-2">
                {/* <Users className="h-4 w-4" /> */}
                <span className="hidden md:inline">Guidelines</span>
              </TabsTrigger>
              <TabsTrigger value="more-info" className="flex items-center gap-2">
                {/* <Trophy className="h-4 w-4" /> */}
                <span className="hidden md:inline">More Info</span>
              </TabsTrigger>
            </TabsList>
            
            
  
          
  
          <TabsContent value="rules">
           <RulesTab/>
          </TabsContent>
  
          <TabsContent value="guidelines">
         <GuidelinesTab/>
          </TabsContent>
          <TabsContent value="more-info">
         <MoreInfoTab/>
          </TabsContent>
          </Tabs>
        </div>
      );
}

export default InformationPage
