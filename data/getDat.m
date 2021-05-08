% need to randomly draw 3 rounds
% close browser when done
D=dir('CVP_Task*');
filNames={D.name};
[filNames,filIndex]=sort_nat(filNames);
% high divergence choice for each divergence condition, for sa, ss, as, aa,
% where first letter is high div play and second letter is lower div play
hd10v4=[];
hd15v4=[];
hd20v4=[];
hd20v15=[];
hd20v10=[];
% double check with counterbalanced pair from hd
cb10v4=[];
cb15v4=[];
cb20v4=[];
cb20v15=[];
cb20v10=[];

for s=1:length(filNames)
    opts=detectImportOptions(filNames{s});    
    opts.Delimiter={','};
    opts.VariableNames={'rt','key_press','time_elapsed','olife','demographics','chosRoomID', ...
        'chosRoomProb','chosRoomRews','chosRoomPlay','unchosRoomID','unchosRoomProb','unchosRoomRews', ...
        'unchosRoomPlay','rewVal','rewCol','chosPie'};
    opts.VariableNamesLine=1;
    opts.DataLine=2;
    opts = setvartype(opts,{'rt', 'key_press', 'rewVal'},'double');
    opts = setvaropts(opts,14,'FillValue',100);
    dat=readtable(filNames{s}, opts);   
    pieChoice=table2array(dat(:,[1,2,14]));
    pieChoice=[pieChoice, zeros(length(pieChoice), 2)];
    rmChoice=[dat.chosRoomID(~cellfun('isempty',dat.chosRoomID)), dat.unchosRoomID(~cellfun('isempty',dat.unchosRoomID)),...
        dat.chosRoomPlay(~cellfun('isempty',dat.chosRoomPlay)), dat.unchosRoomPlay(~cellfun('isempty',dat.unchosRoomPlay))];
    hold=dat.key_press(dat.rewVal==100);
    rmChoice=[rmChoice, cellstr(num2str(hold))];
    reConstr=cell(40,4);    
    for x=1:40
        if contains([rmChoice{x,5}], '37')
            reConstr(x,1:4)=rmChoice(x,1:4);
        elseif contains([rmChoice{x,5}], '39')
            reConstr(x,1:4)=rmChoice(x,[2 1 4 3]);
        end
    end   
    holdConds=zeros(5,4);
    choUncho={'10','4'; '15','4'; '20','4'; '20','10'; '20','15'};
    for c=1:5
        for x=1:40
            if  contains([rmChoice{x,1}], choUncho(c,1)) && contains([rmChoice{x,2}], choUncho(c,2)) 
                if contains([rmChoice{x,3}], 's') && contains([rmChoice{x,4}], 'a')
                    holdConds(c,1)=holdConds(1,1)+1;
                elseif contains([rmChoice{x,3}], 's') && contains([rmChoice{x,4}], 's')
                    holdConds(c,2)=holdConds(1,2)+1;
                elseif contains([rmChoice{x,3}], 'a') && contains([rmChoice{x,4}], 's')
                    holdConds(c,3)=holdConds(1,3)+1;                
                 elseif contains([rmChoice{x,3}], 'a') && contains([rmChoice{x,4}], 'a')
                    holdConds(c,4)=holdConds(1,4)+1;      
                end
            end
        end
    end
    hd10v4=[hd10v4; holdConds(1,:)];
    hd15v4=[hd15v4; holdConds(2,:)];
    hd20v4=[hd20v4; holdConds(3,:)];
    hd20v10=[hd20v10; holdConds(4,:)];
    hd20v15=[hd20v15; holdConds(5,:)];
    holdConds=zeros(5,4);
    for c=1:5
        for x=1:40
            if  contains([rmChoice{x,2}], choUncho(c,1)) && contains([rmChoice{x,1}], choUncho(c,2)) 
                if contains([rmChoice{x,4}], 's') && contains([rmChoice{x,3}], 'a')
                    holdConds(c,1)=holdConds(1,1)+1;
                elseif contains([rmChoice{x,4}], 's') && contains([rmChoice{x,3}], 's')
                    holdConds(c,2)=holdConds(1,2)+1;
                elseif contains([rmChoice{x,4}], 'a') && contains([rmChoice{x,3}], 's')
                    holdConds(c,3)=holdConds(1,3)+1;                
                 elseif contains([rmChoice{x,4}], 'a') && contains([rmChoice{x,3}], 'a')
                    holdConds(c,4)=holdConds(1,4)+1;      
                end
            end
        end
    end
    cb10v4=[cb10v4; holdConds(1,:)];
    cb15v4=[cb15v4; holdConds(2,:)];
    cb20v4=[cb20v4; holdConds(3,:)];
    cb20v10=[cb20v10; holdConds(4,:)];
    cb20v15=[cb20v15; holdConds(5,:)];    
    for x=1:5:196
        pieChoice(x+1:x+4,4)=strcmp(dat.chosRoomPlay(x),'s');
        if str2double(dat.chosRoomID{x}(1))==4
           pieChoice(x+1:x+4,5)=str2double(dat.chosRoomID{x}(1));
        else
            pieChoice(x+1:x+4,5)=str2double(dat.chosRoomID{x}(1:2));
        end
    end
    pieChoice(pieChoice(:,3)==100,:)=[];    
    cond={'hd10v4'; 'hd15v4'; 'hd20v4'; 'hd20v10'; 'hd20v15'};    
    sa=[mean(hd10v4(:,1)); mean(hd15v4(:,1)); mean(hd20v4(:,1)); mean(hd20v10(:,1)); mean(hd20v15(:,1))];     
    ss=[mean(hd10v4(:,2)); mean(hd15v4(:,2)); mean(hd20v4(:,2)); mean(hd20v10(:,2)); mean(hd20v15(:,2))];    
    as=[mean(hd10v4(:,3)); mean(hd15v4(:,3)); mean(hd20v4(:,3)); mean(hd20v10(:,3)); mean(hd20v15(:,3))];  
    aa=[mean(hd10v4(:,4)); mean(hd15v4(:,4)); mean(hd20v4(:,4)); mean(hd20v10(:,4)); mean(hd20v15(:,4))];    
    T = table(cond,sa,ss,as,aa);
end