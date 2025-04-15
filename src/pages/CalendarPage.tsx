
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react";

const CalendarPage = () => {
  const [view, setView] = useState<"day" | "week">("week");
  const [currentDate, setCurrentDate] = useState(new Date());

  // Helper to get day name
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Helper to get date number
  const getDateNumber = (date: Date) => {
    return date.getDate();
  };

  // Generate week days from current date
  const getWeekDays = () => {
    const days = [];
    const currentDay = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
    
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDay);
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  // Mock calendar events
  const events = [
    {
      id: 1,
      title: "Team Standup",
      start: "09:00",
      end: "09:30",
      day: 2, // Tuesday (0-indexed from Sunday)
      color: "bg-ai-blue",
    },
    {
      id: 2,
      title: "Product Review",
      start: "11:00",
      end: "12:00",
      day: 2, // Tuesday
      color: "bg-ai-purple",
    },
    {
      id: 3,
      title: "Client Meeting",
      start: "14:00",
      end: "15:30",
      day: 3, // Wednesday
      color: "bg-ai-green",
    },
    {
      id: 4,
      title: "Design Workshop",
      start: "10:00",
      end: "11:30",
      day: 4, // Thursday
      color: "bg-ai-orange",
    },
    {
      id: 5,
      title: "Team Lunch",
      start: "12:30",
      end: "13:30",
      day: 4, // Thursday
      color: "bg-ai-teal",
    },
  ];

  // Time slots for day view
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const nextPeriod = () => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(currentDate.getDate() + 7);
    } else {
      newDate.setDate(currentDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const prevPeriod = () => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(currentDate.getDate() - 7);
    } else {
      newDate.setDate(currentDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const today = () => {
    setCurrentDate(new Date());
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and events</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center rounded-lg overflow-hidden border border-border">
            <Button 
              variant="ghost" 
              className={`rounded-none ${view === 'day' ? 'bg-accent text-accent-foreground' : ''}`}
              onClick={() => setView('day')}
            >
              Day
            </Button>
            <Button 
              variant="ghost" 
              className={`rounded-none ${view === 'week' ? 'bg-accent text-accent-foreground' : ''}`}
              onClick={() => setView('week')}
            >
              Week
            </Button>
          </div>
          <Button className="flex items-center gap-2 bg-ai-purple text-white hover:bg-ai-purple/90">
            <Plus className="h-4 w-4" />
            Add Event
          </Button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="glass-morphism">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <CalendarIcon className="text-ai-purple" />
              <span>{formatDate(currentDate)}</span>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={prevPeriod}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={today}>Today</Button>
              <Button variant="outline" size="icon" onClick={nextPeriod}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {view === 'week' ? (
              <div className="grid grid-cols-7 gap-2 min-h-[500px]">
                {getWeekDays().map((day, index) => (
                  <div key={index} className="flex flex-col h-full">
                    <div className={`
                      text-center p-2 rounded-t-lg 
                      ${day.toDateString() === new Date().toDateString() 
                        ? 'bg-ai-purple/20 text-white' 
                        : 'bg-white/5'}
                    `}>
                      <div className="font-medium">{getDayName(day)}</div>
                      <div className={`
                        size-8 mx-auto rounded-full flex items-center justify-center
                        ${day.toDateString() === new Date().toDateString() 
                          ? 'bg-ai-purple text-white' 
                          : ''}
                      `}>
                        {getDateNumber(day)}
                      </div>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-b-lg p-2 space-y-2 min-h-[400px]">
                      {events
                        .filter(event => event.day === index)
                        .map(event => (
                          <div 
                            key={event.id} 
                            className={`
                              p-2 rounded-lg ${event.color} text-white text-sm cursor-pointer
                              hover:opacity-90 transition-opacity
                            `}
                          >
                            <div className="font-medium">{event.title}</div>
                            <div className="text-xs flex items-center">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {event.start} - {event.end}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="min-h-[500px] bg-white/5 rounded-lg p-4">
                <div className="font-medium text-lg mb-4">
                  {currentDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="space-y-2">
                  {timeSlots.map((time, index) => (
                    <div key={index} className="grid grid-cols-[80px_1fr] border-b border-border pb-2">
                      <div className="text-sm text-muted-foreground">{time}</div>
                      <div className="bg-white/5 rounded-lg min-h-[60px] p-2">
                        {/* Event would go here based on time slot */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CalendarPage;
