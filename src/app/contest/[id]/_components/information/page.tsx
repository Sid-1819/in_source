import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs';
import React from 'react'
import ApplicantsList from '../participants/page';
import WinnersList from '../winners/page';

const InformationPage = () => {
    return (
        <div className="mx-auto w-full max-w-3xl">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
             
              <TabsTrigger value="info" className="flex items-center gap-2">
                {/* <Info className="h-4 w-4" /> */}
                <span className="hidden md:inline">Rules</span>
              </TabsTrigger>
              <TabsTrigger value="participants" className="flex items-center gap-2">
                {/* <Users className="h-4 w-4" /> */}
                <span className="hidden md:inline">Guidelines</span>
              </TabsTrigger>
              <TabsTrigger value="winners" className="flex items-center gap-2">
                {/* <Trophy className="h-4 w-4" /> */}
                <span className="hidden md:inline">More Info</span>
              </TabsTrigger>
            </TabsList>
            
            
  
          
  
          <TabsContent value="participants">
            <ApplicantsList/>
          </TabsContent>
  
          <TabsContent value="winners">
            <WinnersList />
          </TabsContent>
          </Tabs>
        </div>
      );
}

export default InformationPage
