import { TabsContent } from '~/components/ui/tabs';
import React from 'react'
;

interface TabContentProps {
    output: string;
  }
const TabContent: React.FC<TabContentProps> = ({ output }) => {
    return (
      <div className="mx-auto w-full">
        {/* Description Tab Content */}
        <TabsContent value="description">
          <h2 className="mb-4 text-xl font-medium">Description</h2>
          <div
            className="prose w-full leading-relaxed"
            dangerouslySetInnerHTML={{ __html: output }}
          />
        </TabsContent>
  
        {/* Info Tab Content */}
        <TabsContent value="info">
          <h2 className="mb-4 text-xl font-medium">Contest Information</h2>
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Important Dates</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Registration Opens:</span>
                      <span>Oct 15, 2024</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Submission Deadline:</span>
                      <span>Dec 10, 2024</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Winners Announced:</span>
                      <span>Dec 20, 2024</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Rules</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Must be original work</li>
                    <li>Individual or team participation allowed</li>
                    <li>Follow submission guidelines</li>
                    <li>Adhere to code of conduct</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Resources</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>API Documentation</li>
                    <li>Starter Templates</li>
                    <li>Tutorial Videos</li>
                    <li>Support Forums</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Contact</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Discord Community Channel</li>
                    <li>Email Support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
  
        {/* Participants Tab Content */}
        <TabsContent value="participants">
          <h2 className="mb-4 text-xl font-medium">Participants</h2>
          <div className="text-muted-foreground">
            Participants list will be displayed here...
          </div>
        </TabsContent>
  
        {/* Winners Tab Content */}
        <TabsContent value="winners">
          <h2 className="mb-4 text-xl font-medium">Winners</h2>
          <div className="text-muted-foreground">
            Winners will be announced after the contest...
          </div>
        </TabsContent>
      </div>
    );
  };

export default TabContent;
